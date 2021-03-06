import { LibClusterCommands } from "app/backend/endpoints";

import { CallResult, endpoints, http } from "./tools";

const { shape } = endpoints.libCluster;

type InputPayload = ReturnType<typeof JSON.parse>;
type LibResult = CallResult<typeof shape>;

const libCall = async (url: string, payload: InputPayload): LibResult =>
  http.post(url, { payload, shape });

export const libCallCluster = async ({
  clusterName,
  command,
}: {
  clusterName: string;
  command: LibClusterCommands[number];
}): LibResult => {
  return libCall(
    endpoints.libCluster.url({ clusterName, command: command.name }),
    command.payload,
  );
};
