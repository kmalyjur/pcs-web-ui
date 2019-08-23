import React from "react";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { all } from "redux-saga/effects";

import * as login from "app/scenes/login";
import * as dashboard from "app/scenes/dashboard";
import * as cluster from "app/services/cluster";
import * as addExistingCluster from "app/scenes/dashboard-add-cluster";
import * as notifications from "app/scenes/notifications";
import * as dataLoad from "app/services/data-load";
import { ClusterOverviewPage } from "app/scenes/cluster-overview";
import { ClusterNodesPage } from "app/scenes/cluster-node-list";
import { ClusterResourceListPage } from "app/scenes/cluster-resource-list";
import { ClusterStonithListPage } from "app/scenes/cluster-stonith-list";

import { RootState } from "./types";
import Scratch from "./components/Scratch";
import withClusterUrlName from "./components/withClusterUrlName";

const rootReducer = (history: History) => combineReducers<RootState>({
  router: connectRouter(history),
  dashboard: dashboard.reducer,
  addExistingCluster: addExistingCluster.reducer,
  cluster: cluster.reducer,
  login: login.reducer,
  notifications: notifications.reducer,
});

function* rootSaga() {
  yield all([
    ...login.sagas,
    ...dataLoad.sagas,
    ...dashboard.sagas,
    ...cluster.sagas,
    ...addExistingCluster.sagas,
    ...notifications.sagas,
  ]);
}

const routes = [
  {
    exact: true,
    path: "/",
    render: () => <dashboard.DashboardPage />,
  },
  {
    exact: true,
    path: "/scratch",
    render: () => <Scratch />,
  },
  {
    exact: true,
    path: "/add-cluster",
    render: () => <addExistingCluster.AddClusterPage />,
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/nodes",
    render: withClusterUrlName(ClusterNodesPage),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/resources",
    render: withClusterUrlName(ClusterResourceListPage),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/stonith",
    render: withClusterUrlName(ClusterStonithListPage),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName",
    render: withClusterUrlName(ClusterOverviewPage),
  },
  { render: () => <div>404</div> },
];

export {
  rootReducer,
  rootSaga,
  routes,
};