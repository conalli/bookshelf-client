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
