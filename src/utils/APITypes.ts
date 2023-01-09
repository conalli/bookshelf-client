export type User = {
  id: string;
  api_key: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  provider: string;
  cmds: CMD;
};

export type CMD = { [cmd: string]: string };

export type Bookmark = {
  id: string;
  api_key: string;
  path: string;
  url: string;
  name: string;
  is_folder: boolean;
};

export type Folder = {
  id: string;
  name: string;
  path: string;
  bookmarks: Bookmark[] | null;
  folders: Folder[] | null;
};

export type SignUpReq = {
  email: string;
  password: string;
};

export type LogInReq = {
  email: string;
  password: string;
};

export type GetCMDRes = CMD | ErrorRes;

export type AddCMDReq = {
  id: string;
  cmd: string;
  url: string;
};

export type AddCMDRes = {
  num_updated: number;
};

export type DelCMDReq = {
  id: string;
  cmd: string;
};

export type DelCMDRes = {
  num_updated: number;
};

export type AddBookmarkFileRes = {
  num_added: number;
};

export type DelACCReq = {
  id: string;
  name: string;
  password: string;
};

export type DelACCRes = {
  name: string;
  num_deleted: number;
  users: User[];
};

export type ErrorRes = {
  status: number;
  error: string;
};
