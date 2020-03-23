import React from "react";
import {
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { push } from "connected-react-router";

import { join } from "app/view/utils";

import { AddClusterPage } from "./addCluster";

export const DashboardToolbar = ({ urlPrefix }: { urlPrefix: string }) => {
  const dispatch = useDispatch();
  const toDashboard = () => dispatch(push(urlPrefix));

  const addClusterUrl = join(urlPrefix, "add-cluster");
  const addCluster = useRouteMatch({ exact: true, path: addClusterUrl });
  return (
    <Toolbar aria-label="Dashboard toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <Button
            variant="primary"
            onClick={() => dispatch(push(addClusterUrl))}
            aria-label="Add cluster"
          >
            Add existing cluster
          </Button>
          {addCluster && <AddClusterPage onClose={toDashboard} />}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
