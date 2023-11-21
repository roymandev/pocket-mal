export type ApiResList<T> = {
  data: { node: T }[];
  paging: {
    previous?: string;
    next?: string;
  };
};

export type ApiResError = {
  error: 'invalid_token';
  message: 'token is invalid';
};
