import React from "react";
import { useSelector } from "react-redux";

import { useGroupDetailViewContext } from "app/view/common";
import { selectors } from "app/store";

import { ResourceDoesNotExists } from "./ResourceDoesNotExists";
import { ClonePage } from "./clone";
import { GroupPage } from "./group";
import { PrimitivePage } from "./primitive";

export const ResourceDetailPage: React.FC<{}> = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  const resourceTreeItem = useSelector(
    selectors.getSelectedResource(selectedItemUrlName),
  );

  if (!resourceTreeItem) {
    return <ResourceDoesNotExists resourceUrlName={selectedItemUrlName} />;
  }

  switch (resourceTreeItem.itemType) {
    case "primitive": return <PrimitivePage primitive={resourceTreeItem} />;
    case "group": return <GroupPage group={resourceTreeItem} />;
    case "clone": default: return <ClonePage clone={resourceTreeItem} />;
  }
};
