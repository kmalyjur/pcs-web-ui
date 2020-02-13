import React from "react";

import { types } from "app/store";
import { ConstraintCellResourceSet } from "./ConstraintCellResourceSet";

import { ConstraintRow } from "./ConstraintRow";
import { ConstraintCell } from "./ConstraintCell";
import { ConstraintCellOrderScoreKind } from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrder = ({ constraint, resourceId }: {
  constraint: types.cluster.ConstraintOrder;
  resourceId: string;
}) => {
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Order (set)" />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
        <ConstraintCellOrderScoreKind constraint={constraint} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Order" />
      {constraint.first === resourceId && (
        <ConstraintCell label="Before" value={constraint.then} />
      )}
      {constraint.then === resourceId && (
        <ConstraintCell label="After" value={constraint.first} />
      )}
      <ConstraintCellOrderScoreKind constraint={constraint} />
    </ConstraintRow>
  );
};
