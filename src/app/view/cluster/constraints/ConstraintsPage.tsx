import React from "react";
import {
  ActionList,
  ActionListItem,
  Card,
  CardBody,
  PageSection,
} from "@patternfly/react-core";

import { ClusterSectionToolbar } from "app/view/share";

import { ConstraintFilteredList } from "./ConstraintFilteredList";
import {
  ConstraintCreateLocationToolbarItem,
  ConstraintCreateOrderToolbarItem,
} from "./task";

export const ConstraintsPage: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <ConstraintCreateLocationToolbarItem />
          </ActionListItem>
          <ActionListItem>
            <ConstraintCreateOrderToolbarItem />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <PageSection>
        <Card>
          <CardBody>
            <ConstraintFilteredList clusterName={clusterName} />
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};
