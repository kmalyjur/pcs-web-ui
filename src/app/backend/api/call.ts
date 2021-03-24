import * as result from "app/backend/calls/tools/result";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Call<PAYLOAD> = (...args: any[]) => Promise<result.Overall<PAYLOAD>>;

export type ResultOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? result.Overall<PAYLOAD>
  : never;

export type PayloadOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? PAYLOAD
  : never;
