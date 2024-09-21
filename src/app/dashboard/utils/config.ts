import "../../../../envConfig.ts";

export const ENDPOINT = process.env.NEXT_PUBLIC_HOST || "http://localhost:4000";
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENV || "development";
export const IS_DEVELOPMENT = ENVIRONMENT === "development";
