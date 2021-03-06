import { LibReport } from "app/store/types";

import { Reducer } from "../tools";

type InstanceAttrName = string;
type InstanceAttrValue = string;
type InstanceAttrs = Record<InstanceAttrName, InstanceAttrValue>;

const initialState: {
  agentName: string;
  resourceName: string;
  instanceAttrs: InstanceAttrs;
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
  reports: LibReport[];
  showValidationErrors: boolean;
  clone: boolean;
  promotable: boolean;
  disabled: boolean;
  useGroup: "no" | "existing" | "new";
  group: string;
} = {
  resourceName: "",
  agentName: "",
  response: "no-response",
  instanceAttrs: {},
  reports: [],
  showValidationErrors: false,
  clone: false,
  promotable: false,
  disabled: false,
  useGroup: "no",
  group: "",
};

const instanceAttrs = (stateAttrs: InstanceAttrs, actionAttrs: InstanceAttrs) =>
  Object.keys(actionAttrs).reduce((attrs, name) => {
    if (actionAttrs[name].length > 0) {
      return { ...attrs, [name]: actionAttrs[name] };
    }
    const { [name]: _, ...rest } = stateAttrs;
    return rest;
  }, stateAttrs);

export const wizardResourceCreate: Reducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload,
        instanceAttrs: instanceAttrs(
          state.instanceAttrs,
          action.payload.instanceAttrs || {},
        ),
      };
    }
    case "RESOURCE.CREATE":
      return { ...state, response: "no-response" };
    case "RESOURCE.CREATE.SUCCESS":
      return {
        ...state,
        response: "success",
        reports: action.payload.reports,
      };
    case "RESOURCE.CREATE.FAIL":
      return {
        ...state,
        response: "fail",
        reports: action.payload.reports,
      };
    case "RESOURCE.CREATE.ERROR":
      return { ...state, response: "communication-error" };
    case "RESOURCE.CREATE.CLOSE":
      return initialState;
    case "CLUSTER.WIZARD.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };
    case "CLUSTER.WIZARD.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };
    default:
      return state;
  }
};
