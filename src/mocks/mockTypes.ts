export type MockUser = {
  id: string;
  name: string;
  password: string;
  APIKey: string;
  commands: { [c: string]: string };
};

export type ErrRes = {
  status: string;
};
