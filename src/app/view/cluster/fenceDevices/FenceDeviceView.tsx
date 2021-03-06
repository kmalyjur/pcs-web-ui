import React from "react";

import { FenceDevice } from "app/view/cluster/types";
import {
  DetailLayout,
  UrlTabs,
  join,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view/share";

import { useClusterFenceAgent } from "./useFenceAgent";
import { FenceDeviceDetailView } from "./FenceDeviceDetailView";
import { FenceDeviceArgumentsView } from "./arguments";
import { FencePageToolbar } from "./FencePageToolbar";

export const FenceDeviceView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  useClusterFenceAgent(fenceDevice.agentName);
  const { urlPrefix } = useGroupDetailViewContext();
  const fenceDeviceUrlPrefix = join(urlPrefix, fenceDevice.id);
  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: fenceDeviceUrlPrefix, exact: true }),
    Arguments: useMatch(join(fenceDeviceUrlPrefix, "arguments")),
  });
  return (
    <DetailLayout
      caption={fenceDevice.id}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
      data-test={`fence-device-detail ${fenceDevice.id}`}
      toolbar={<FencePageToolbar fenceDevice={fenceDevice} />}
    >
      {tab === "Detail" && <FenceDeviceDetailView fenceDevice={fenceDevice} />}
      {tab === "Arguments" && (
        <FenceDeviceArgumentsView fenceDevice={fenceDevice} />
      )}
    </DetailLayout>
  );
};
