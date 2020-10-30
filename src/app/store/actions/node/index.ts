import * as add from "./add";

export type NodeActions = {
  StartNode: {
    type: "NODE.START";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  StopNode: {
    type: "NODE.STOP";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  NodeAdd: add.Add;
  NodeAddSuccess: add.AddSuccess;
  NodeAddFailed: add.AddFailed;
  NodeAddError: add.AddError;
  NodeAddUpdate: add.Update;
  NodeAddCheckCanAdd: add.CheckCanAdd;
  NodeAddCheckCanAddFailed: add.CheckCanAddFailed;
  NodeAddCheckAuth: add.CheckAuth;
  NodeAddCheckAuthFailed: add.CheckAuthFailed;
  NodeAddCheckAuthSuccess: add.CheckAuthSuccess;
  NodeAddCheckAuthNoAuth: add.CheckAuthNoAuth;
  NodeAddSendKnownHosts: add.SendKnownHosts;
  NodeAddSendKnownHostsSuccess: add.SendKnownHostsSuccess;
  NodeAddSendKnownHostsFailed: add.SendKnownHostsFailed;
  NodeAddAuthenticate: add.Authenticate;
  NodeAddAuthenticateFailed: add.AuthenticateFailed;
};
