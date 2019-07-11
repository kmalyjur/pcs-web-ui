import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { NODE } from "app/services/cluster/status-constants";
import { mapConstants, compareStrings } from "app/utils";

const { STATUS, QUORUM } = NODE;

const statusLabel = mapConstants("Unknown", {
  [STATUS.ONLINE]: "Online",
  [STATUS.OFFLINE]: "Offline",
});
const statusToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [STATUS.ONLINE]: StatusIco.STATUS_MAP.OK,
  [STATUS.OFFLINE]: StatusIco.STATUS_MAP.ERROR,
});

const quorumLabel = mapConstants("Unknown", {
  [QUORUM.YES]: "Yes",
  [QUORUM.NO]: "No",
});
const quorumToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [QUORUM.YES]: StatusIco.STATUS_MAP.OK,
  [QUORUM.NO]: StatusIco.STATUS_MAP.WARNING,
});

export const nodesToSummaryStatus = StatusIco.itemsToSummaryStatus((node) => {
  if (node.status === STATUS.OFFLINE) {
    return StatusIco.STATUS_MAP.ERROR;
  }
  if (node.quorum === QUORUM.NO) {
    return StatusIco.STATUS_MAP.WARNING;
  }
  if (node.status === STATUS.ONLINE && node.quorum === QUORUM.YES) {
    return StatusIco.STATUS_MAP.OK;
  }
  return StatusIco.STATUS_MAP.UNKNOWN;
});

const COLUMNS = {
  NAME: "NAME",
  STATUS: "STATUS",
  QUORUM: "QUORUM",
};

const quorumSeverity = mapConstants(1, {
  [QUORUM.YES]: 0,
  [QUORUM.NO]: 2,
});

const statusSeverity = mapConstants(1, {
  [STATUS.ONLINE]: 0,
  [STATUS.OFFLINE]: 2,
});

const compareByColumn = (column) => {
  switch (column) {
    case COLUMNS.QUORUM: return (a, b) => (
      quorumSeverity(a.quorum) - quorumSeverity(b.quorum)
    );
    case COLUMNS.STATUS: return (a, b) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (a, b) => compareStrings(a.name, b.name);
  }
};

const DashboardNodeList = ({ nodeList }) => {
  const {
    compareItems,
    SortableTh,
  } = Table.SortableTh.useSorting(COLUMNS.NAME);

  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <SortableTh columnName={COLUMNS.NAME}>Node</SortableTh>
          <SortableTh columnName={COLUMNS.STATUS} startDesc>Status</SortableTh>
          <SortableTh columnName={COLUMNS.QUORUM} startDesc>Quorum</SortableTh>
        </tr>
      </thead>
      <tbody>
        {nodeList.sort(compareItems(compareByColumn)).map(node => (
          <tr key={node.name}>
            <td>{node.name}</td>
            <td>
              <StatusSign
                status={statusToStatusIco(node.status)}
                label={statusLabel(node.status)}
              />
            </td>
            <td>
              <StatusSign
                status={quorumToStatusIco(node.quorum)}
                label={quorumLabel(node.quorum)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DashboardNodeList;
