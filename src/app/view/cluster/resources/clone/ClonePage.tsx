import React from "react";

import { Clone } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  UrlTabs,
  join,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view/share";

import { CloneDetail } from "./CloneDetail";

export const ClonePage = ({ clone }: { clone: Clone }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, clone.id);
  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
    Meta: useMatch(join(resourceUrlPrefix, "meta-attributes")),
  });
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
      data-test={`resource-detail ${clone.id}`}
    >
      {tab === "Detail" && <CloneDetail clone={clone} />}
      {tab === "Meta" && (
        <NVPairListView nvPairListView={clone.metaAttributes} />
      )}
    </DetailLayout>
  );
};
