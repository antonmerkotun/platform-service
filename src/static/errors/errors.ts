export const Errors = {
  NoRefreshToken: "Refresh token wasn't generated",
  Method: {
    NotImplemented: (
      controller: string,
      method: string,
      gatewayMethod: string,
      error: string,
    ) => `${controller} -> ${method} -> ${gatewayMethod} = ${error}`,
  },
};
