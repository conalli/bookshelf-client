export type MockUser = {
  id: string;
  name: string;
  password: string;
  apiKey: string;
  commands: { [c: string]: string };
};

export type SignUpReq = {
  name: string;
  password: string;
};

export type SignUpRes = {
  id: string;
  apiKey: string;
};

export type LogInReq = {
  name: string;
  password: string;
};

export type LogInRes = {
  id: string;
  apiKey: string;
};

export type SetCMDReq = {
  cmd: string;
  url: string;
};

export type SetCMDRes = {
  numUpdated: number;
};

export type DelCMDReq = {
  id: string;
  cmd: string;
};

export type DelCMDRes = {
  numUpdated: number;
};

export type DelACCReq = {
  id: string;
  name: string;
  password: string;
};

export type DelACCRes = {
  name: string;
  numDeleted: number;
  users: MockUser[];
};

export type ErrRes = {
  status: string;
};
