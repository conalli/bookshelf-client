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
