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
