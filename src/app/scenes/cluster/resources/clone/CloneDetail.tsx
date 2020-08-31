import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";

import { selectors, types, url } from "app/store";
import {
  CrmStatusTable,
  IssueList,
  Link,
  pallete,
  useClusterSelector,
} from "app/view";

export const CloneDetail = ({ clone }: { clone: types.cluster.Clone }) => {
  const [crmStatusList, clusterName] = useClusterSelector(
    selectors.crmStatusForPrimitive,
    clone.member.itemType === "primitive"
      ? [clone.member.id]
      : clone.member.resources.map(r => r.id),
  );
  return (
    <>
      <StackItem>
        <IssueList issueList={clone.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Members statuses on nodes </Text>
        </TextContent>

        {crmStatusList.length === 0 && (
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon icon={SearchIcon} color={pallete.UNKNOWN} />
            <Title size="lg" headingLevel="h3">
              {`No status info for clone ${clone.id} found.`}
            </Title>
            <EmptyStateBody>
              {`No status info for clone ${clone.id} found.`}
            </EmptyStateBody>
          </EmptyState>
        )}

        {crmStatusList.length > 0 && (
          <CrmStatusTable
            crmStatusList={crmStatusList}
            rowObject={{
              header: "Resource / Node",
              cell: crmStatus => (
                <>
                  <Link
                    to={url.cluster.resources(
                      clusterName,
                      crmStatus.resource.id,
                    )}
                  />
                  {crmStatus.node && (
                    <>
                      <span>{" / "}</span>
                      <Link
                        to={url.cluster.nodes(clusterName, crmStatus.node.name)}
                      />
                    </>
                  )}
                </>
              ),
            }}
          />
        )}
      </StackItem>
    </>
  );
};