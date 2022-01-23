import { MockUser } from "../mocks/mockTypes";

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

export type AddCMDReq = {
  id: string;
  cmd: string;
  url: string;
};

export type AddCMDRes = {
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

export type ErrorRes = {
  status: number;
  error: string;
};
