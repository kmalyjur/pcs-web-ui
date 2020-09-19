import { CallLibResult, callLib } from "./lib";

export const resourceUnmanage: CallLibResult = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) => {
  return callLib({
    clusterUrlName,
    urlName: "resource-unmanage",
    payload: {
      resource_or_tag_ids: resourceNameList,
    },
  });
};
