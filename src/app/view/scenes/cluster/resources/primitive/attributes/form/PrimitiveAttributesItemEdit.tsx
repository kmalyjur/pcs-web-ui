import React from "react";
import {
  Alert,
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";

import AttributeDecisionFormGroup from "./AttributeDecisionFormGroup";
import AttributeDecisionRadio from "./AttributeDecisionRadio";


const PrimitiveAttributesItemEdit = ({
  label,
  userValue,
  initialValue,
  remoteValue,
  onChange,
}: {
  label: string;
  userValue: string;
  initialValue: string;
  remoteValue: string;
  onChange: (key: string, value: string) => void;
}) => {
  const id = `resource-attribute-${label}`;
  return (
    <AttributeDecisionFormGroup label={label}>
      <Stack>
        {remoteValue !== initialValue && (
          <>
            <StackItem className="pf-u-mb-sm">
              <Alert
                variant="warning"
                isInline
                title="Another user provided a new value for this field."
              />
            </StackItem>
            <StackItem className="pf-u-mt-sm">
              <AttributeDecisionRadio
                id={`remote-value-${label}`}
                name={label}
                ariaLabel={`Use concurent value: ${remoteValue}`}
                value={remoteValue}
              >
                <strong>{remoteValue}</strong>
              </AttributeDecisionRadio>
            </StackItem>
          </>
        )}
        <StackItem>
          <TextInput
            type="text"
            id={id}
            name={id}
            defaultValue={userValue}
            onChange={(updatedValue: string) => onChange(label, updatedValue)}
          />
        </StackItem>
      </Stack>
    </AttributeDecisionFormGroup>
  );
};

export default PrimitiveAttributesItemEdit;
