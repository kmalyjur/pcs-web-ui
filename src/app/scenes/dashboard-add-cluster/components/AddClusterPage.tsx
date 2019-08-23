import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Wizard } from "@patternfly/react-core";

import DashboardPage from "app/scenes/dashboard/components/DashboardPage";

import { AUTH_STATE, ClusterAddActionType } from "../types";
import { AddCluster } from "../actions";
import * as selectors from "../selectors";
import AddClusterStepAuth from "./AddClusterStepAuth";
import AddClusterStepAdd from "./AddClusterStepAdd";

const AddClusterPage = () => {
  const stepAuthState = useSelector(selectors.getStepAuthState);
  const nodeName = useSelector(selectors.getNodeName);
  const dispatch = useDispatch();

  const steps = [
    {
      name: "Node authentication",
      component: <AddClusterStepAuth />,
      enableNext: stepAuthState === AUTH_STATE.ALREADY_AUTHENTICATED,
    },
    {
      name: "Add cluster",
      component: <AddClusterStepAdd />,
    },
  ];
  return (
    <>
      <DashboardPage />
      <Wizard
        data-role="add-cluster-wizard"
        isOpen
        onNext={() => dispatch<AddCluster>({
          type: ClusterAddActionType.ADD_CLUSTER,
          payload: { nodeName },
        })}
        onClose={() => dispatch(push("/"))}
        title="Add existing cluster"
        description="Add existing cluster wizard"
        steps={steps}
      />
    </>
  );
};

export default AddClusterPage;
