import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { NodesAuthForm } from "app/view/share";
import { TaskSimple } from "app/view/share";

import { useWizard } from "./useWizard";
import { ClusterIssueNotAuthFooter } from "./ClusterIssueNotAuthFooter";
import { ClusterIssueNotAuthFinish } from "./ClusterIssueNotAuthFinish";

export const ClusterIssueNotAuth: React.FC<{ nodeList: string[] }> = ({
  nodeList,
}) => {
  const { open, cancel, authProcessId, fixAuthStart } = useWizard();
  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink onClick={() => fixAuthStart(nodeList)}>
            Fix authentication
          </AlertActionLink>
        }
        data-test={"cluster-issue-nodes-not-auth"}
      >
        Unauthenticated nodes:{" "}
        <span> {[...new Set(nodeList)].join(", ")} </span>
      </Alert>
      {open && (
        <TaskSimple
          title="Authentication of nodes"
          close={cancel}
          footer={<ClusterIssueNotAuthFooter />}
        >
          {authProcessId === null && <ClusterIssueNotAuthFinish />}
          {authProcessId !== null && (
            <NodesAuthForm authProcessId={authProcessId} />
          )}
        </TaskSimple>
      )}
    </>
  );
};
