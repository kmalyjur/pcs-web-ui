import { Cluster } from "../types";

import {
  clusterSelector,
  clusterStorageItemSelector,
} from "./selectorsHelpers";

const findInTopLevelAndGroup = (
  resource: Cluster["resourceTree"][number],
  id: string,
) => {
  if (resource.id === id) {
    return resource;
  }

  if (resource.itemType === "group") {
    const primitive = resource.resources.find(p => p.id === id);
    if (primitive) {
      return primitive;
    }
  }

  return undefined;
};

export const clusterAreDataLoaded = clusterStorageItemSelector(
  clusterStorageItem =>
    clusterStorageItem?.clusterStatus?.dataFetchState === "SUCCESS",
);

export const getCluster = clusterSelector(cluster => cluster);

export const getSelectedResource = clusterSelector((cluster, id: string) => {
  for (const resource of cluster.resourceTree) {
    const matched = findInTopLevelAndGroup(resource, id);
    if (matched) {
      return matched;
    }

    if (resource.itemType === "clone") {
      const member = findInTopLevelAndGroup(resource.member, id);
      if (member) {
        return member;
      }
    }
  }

  return undefined;
});

export const getGroups = clusterSelector(cluster =>
  cluster.resourceTree.reduce<string[]>((groups, resource) => {
    if (resource.itemType === "group") {
      return [...groups, resource.id];
    }
    if (resource.itemType === "clone" && resource.member.itemType === "group") {
      return [...groups, resource.member.id];
    }
    return groups;
  }, []),
);

export const getTopLevelPrimitives = clusterSelector(cluster =>
  cluster.resourceTree.filter(r => r.itemType === "primitive").map(r => r.id),
);

export const getSelectedFenceDevice = clusterSelector((cluster, id: string) =>
  cluster.fenceDeviceList.find(fd => fd.id === id),
);

export const getSelectedNode = clusterSelector((cluster, name: string) =>
  cluster.nodeList.find(node => node.name === name),
);

export const crmStatusForPrimitive = clusterSelector(
  (cluster, primitiveIds: string[]) =>
    cluster.resourceOnNodeStatusList.filter(s =>
      primitiveIds.includes(s.resource.id),
    ),
);

export const crmStatusForNode = clusterSelector((cluster, nodeName: string) =>
  cluster.resourceOnNodeStatusList.filter(s => s.node?.name === nodeName),
);
