import { User } from "../utils/APITypes";

export type MockUser = User & {
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "tom@bookshelftest.com",
    email_verified: true,
    name: "tom",
    given_name: "",
    family_name: "",
    locale: "",
    picture: "",
    password: "password",
    api_key: "qwertyuiop",
    cmds: {
      g: "www.google.com",
      fb: "www.facebook.com",
      tw: "www.twitter.com",
    },
  },
  {
    id: "2",
    email: "sam@bookshelftest.com",
    email_verified: true,
    name: "sam",
    given_name: "",
    family_name: "",
    locale: "",
    picture: "",
    password: "12345",
    api_key: "asdfghj",
    cmds: {
      g: "www.google.com",
      tw: "www.twitter.com",
    },
  },
  {
    id: "3",
    email: "jane@bookshelftest.com",
    email_verified: true,
    name: "jane",
    given_name: "",
    family_name: "",
    locale: "",
    picture: "",
    password: "qwerty",
    api_key: "zxerfgthy,",
    cmds: {
      fb: "www.facebook.com",
      g: "www.google.com",
      gh: "www.github.com",
    },
  },
  {
    id: "4",
    email: "susan@bookshelftest.com",
    email_verified: true,
    name: "susan",
    given_name: "",
    family_name: "",
    locale: "",
    picture: "",
    password: "abcdefg",
    api_key: "ewrfgtyhn",
    cmds: {
      bbc: "www.bbc.co.uk",
      sport: "www.bbc.co.uk/sports",
      g: "www.google.com",
      gh: "www.github.com",
    },
  },
  {
    id: "5",
    email: "testing@bookshelftest.com",
    email_verified: true,
    name: "testing",
    given_name: "",
    family_name: "",
    locale: "",
    picture: "",
    password: "password",
    api_key: "zxcvbn",
    cmds: {
      search: "www.google.com",
    },
  },
];
