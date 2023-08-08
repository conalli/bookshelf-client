export type UpdateCommandStatus = {
  add: {
    success: boolean;
    loading: boolean;
    error: boolean;
  };
  del: {
    success: boolean;
    loading: boolean;
    error: boolean;
  };
};
