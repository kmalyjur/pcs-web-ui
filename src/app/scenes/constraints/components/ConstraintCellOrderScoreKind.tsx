import React from "react";

import { types } from "app/services/cluster";

import ConstraintCell from "./ConstraintCell";

const ConstraintCellOrderScoreKind = ({ constraint }: {
  constraint: types.ConstraintOrder|types.ConstraintOrderSet;
}) => {
  // score and kind are mutually exclusive
  if ("score" in constraint) {
    return <ConstraintCell label="Score" value={constraint.score} />;
  }
  if ("kind" in constraint) {
    return <ConstraintCell label="Kind" value={constraint.kind} />;
  }
  return <ConstraintCell label="Kind" value="Mandatory" />;
};

export default ConstraintCellOrderScoreKind;
