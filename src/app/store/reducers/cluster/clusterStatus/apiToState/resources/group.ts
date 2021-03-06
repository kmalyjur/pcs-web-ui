import { ActionPayload } from "app/store/actions";

import { Cluster } from "../../types";
import { transformIssues } from "../issues";

import { toPrimitive } from "./primitive";
import { buildStatus, getMaxSeverity, isDisabled } from "./statusInfoList";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiResource = ApiCluster["resource_list"][number];
type ApiGroup = Extract<ApiResource, { class_type: "group" }>;
type ApiPrimitiveType = { class_type: "primitive" };
type ApiPrimitive = Extract<ApiResource, ApiPrimitiveType & { stonith: false }>;
type ApiStonith = Extract<ApiResource, ApiPrimitiveType & { stonith: true }>;

type Resource = Cluster["resourceTree"][number];
type Primitive = Extract<Resource, { itemType: "primitive" }>;
type Group = Extract<Resource, { itemType: "group" }>;

type Counts = {
  errors: Record<string, number>;
  warnings: Record<string, number>;
};

const buildStatusInfoList = (
  apiGroup: ApiGroup,
  members: Group["resources"],
): Group["status"]["infoList"] => {
  const infoList: Group["status"]["infoList"] = [];
  if (isDisabled(apiGroup)) {
    infoList.push({ label: "DISABLED", severity: "WARNING" });
  }

  if (members.length === 0) {
    infoList.push({ label: "NO MEMBERS", severity: "WARNING" });
    return infoList;
  }

  const maxSeverity = getMaxSeverity(members, p => p.status.maxSeverity);

  // TODO members should not be OK when group is disabled
  if (maxSeverity === "OK") {
    if (infoList.length < 1) {
      infoList.push({ label: "RUNNING", severity: "OK" });
    }
    return infoList;
  }

  const labelCounts: Counts = members.reduce<Counts>(
    (counts, primitive) => {
      const nextCounts = { ...counts };
      primitive.status.infoList
        // .filter(info => info.severity === maxSeverity)
        // .map(info => info.label)
        .forEach((info: Primitive["status"]["infoList"][number]) => {
          const key = info.severity === "ERROR" ? "errors" : "warnings";
          nextCounts[key][info.label] =
            info.label in counts ? counts.errors[info.label] + 1 : 1;
        });
      return nextCounts;
    },
    { errors: {}, warnings: {} },
  );

  if (Object.keys(labelCounts).length === 0) {
    infoList.push({ label: "UNKNOWN STATUS OF MEMBERS", severity: "WARNING" });
    return infoList;
  }

  Object.keys(labelCounts.errors).forEach(label =>
    infoList.push({
      label: `${labelCounts.errors[label]}/${members.length} ${label}`,
      severity: "ERROR",
    }),
  );
  Object.keys(labelCounts.warnings).forEach(label =>
    infoList.push({
      label: `${labelCounts.warnings[label]}/${members.length} ${label}`,
      severity: "WARNING",
    }),
  );
  return infoList;
};

export const filterPrimitive = (
  candidateList: (ApiPrimitive | ApiStonith)[],
): ApiPrimitive[] =>
  candidateList.filter((m): m is ApiPrimitive => m.class_type === "primitive");

export const toGroup = (
  apiGroup: ApiGroup,
  context: { inClone: boolean } = { inClone: false },
): { group: Group; apiPrimitiveList: ApiPrimitive[] } => {
  // Theoreticaly, group can contain primitive resources, stonith resources or
  // mix of both. A decision here is to filter out stonith...
  const apiPrimitiveList = filterPrimitive(apiGroup.members);
  const { inClone } = context;
  const resources = apiPrimitiveList.map(p =>
    toPrimitive(p, { inGroup: true, inClone }),
  );
  return {
    apiPrimitiveList,
    group: {
      id: apiGroup.id,
      itemType: "group",
      inClone,
      resources,
      status: buildStatus(buildStatusInfoList(apiGroup, resources)),
      issueList: transformIssues(apiGroup),
      metaAttributes: apiGroup.meta_attr,
    },
  };
};
