import * as tabRoutes from "./tabRoutes";

export const toLabel = (flag: string) => (
  flag[0].toUpperCase() + flag.slice(1).toLowerCase()
);

export const join = (urlPrefix: string, path: string = "") => (
  `${urlPrefix.endsWith("/") ? urlPrefix.slice(0, -1) : urlPrefix}/${path}`
);

export {
  tabRoutes,
};
