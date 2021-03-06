import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { selectors } from "app/store";
import { EmptyStateSpinner } from "app/view/share";

export const AddClusterStepAdd = () => {
  const state = useSelector(selectors.addClusterGetStepAddState);
  const errorMessage = useSelector(selectors.addClusterGetStateError);
  return (
    <>
      {state === "STARTED" && (
        <EmptyStateSpinner title="Adding existing cluster" />
      )}
      {(state === "DASHBOARD_RELOADING" || state === "SUCCESS") && (
        <Alert
          isInline
          variant="success"
          title="Cluster has been added."
          data-test="add-success"
        />
      )}
      {state === "DASHBOARD_RELOADING" && (
        <EmptyStateSpinner title="Waiting for dashboard reload" />
      )}
      {state === "ERROR" && (
        <Alert
          isInline
          variant="danger"
          title={errorMessage}
          data-test="add-error"
        />
      )}
    </>
  );
};
