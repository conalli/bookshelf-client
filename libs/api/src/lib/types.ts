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
  cmds: CommandList;
};

export type CommandList = { [cmd: string]: string };

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

export type AuthRequest = {
  email: string;
  password: string;
};

export type AddCommandRequest = {
  id: string;
  cmd: string;
  url: string;
};

export type DeleteCommandRequest = {
  id: string;
  cmd: string;
};

export type AddBookmarkRequest = {
  name: string;
  path: string;
  url: string;
  is_folder: boolean;
};

export type AddCommandResponse = {
  num_updated: number;
};

export type DeleteCommandResponse = {
  num_updated: number;
};

export type AddBookmarkResponse = {
  id: string;
  num_added: number;
  name: string;
  path: string;
  url: string;
  is_folder: boolean;
};

export type AddBookmarkFileResponse = {
  num_added: number;
};

export type DeleteBookmarkResponse = {
  id: string;
  num_deleted: number;
};

export type ErrorResponse = {
  status: number;
  title: string;
  detail: string;
};
