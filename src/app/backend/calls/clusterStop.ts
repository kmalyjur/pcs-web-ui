import { CallResult, endpoints, http } from "./tools";

const { url } = endpoints.clusterStop;

export const clusterStop = async (
  clusterName: string,
  nodeName: string,
): CallResult =>
  http.post(url({ clusterName }), { params: [["name", nodeName]] });
