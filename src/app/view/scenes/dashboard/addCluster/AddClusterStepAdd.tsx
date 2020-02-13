import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { Spinner } from "app/view/common";

const clusterHasBeenAddedStates: types.addCluster.ADD_STATE[] = [
  "DASHBOARD_RELOADING",
  "SUCCESS",
];

export const AddClusterStepAdd = () => {
  const state = useSelector(selectors.addClusterGetStepAddState);
  const errorMessage = useSelector(selectors.addClusterGetStateError);
  return (
    <>
      {state === "STARTED" &&
        <Spinner data-role="waiting-add" text="adding existing cluster..." />
      }
      {
        clusterHasBeenAddedStates.includes(state) && (
          <Alert
            isInline
            variant="success"
            title="Cluster has been added."
            data-role="add-cluster-success"
          />
        )
      }
      {state === "DASHBOARD_RELOADING" && (
        <Spinner
          data-role="waiting-reload"
          text="waiting for dashboard reload"
        />
      )}
      {state === "ERROR" && (
        <Alert
          isInline
          variant="danger"
          title={errorMessage}
          data-role="add-cluster-error-message"
        />
      )}
    </>
  );
};
