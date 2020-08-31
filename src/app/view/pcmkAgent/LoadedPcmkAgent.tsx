import React from "react";
import { useSelector } from "react-redux";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";

import { selectors, types } from "app/store";

// import { Spinner } from "./Spinner";
import * as pallete from "../pallete";

export const LoadedPcmkAgent: React.FC<{
  clusterUrlName: string;
  agentName: string;
  children: (ra: types.pcmkAgents.Agent) => JSX.Element;
  fallback?: JSX.Element | null;
}> = ({ clusterUrlName, agentName, children, fallback = null }) => {
  const agent = useSelector(selectors.getPcmkAgent(clusterUrlName, agentName));

  if (!agent || agent.loadStatus === "LOADING") {
    if (fallback) {
      return fallback;
    }
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon variant="container" component={Spinner} />
        <Title size="lg" headingLevel="h3">
          {`Loading agent "${agentName}" data`}
        </Title>
      </EmptyState>
    );
  }

  if (["LOADED", "RELOADING"].includes(agent.loadStatus)) {
    return children(agent);
  }

  // agent.loadStatus === "FAILED"
  if (fallback) {
    return fallback;
  }
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title size="lg" headingLevel="h3">
        Cannot load data
      </Title>
      <EmptyStateBody>
        {`Cannot load metadata of agent "${agentName}"`}
      </EmptyStateBody>
    </EmptyState>
  );
};