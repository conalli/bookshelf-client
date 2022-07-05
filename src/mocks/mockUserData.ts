import { MockUser } from "./mockTypes";
export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "tom",
    password: "password",
    APIKey: "qwertyuiop",
    commands: {
      g: "www.google.com",
      fb: "www.facebook.com",
      tw: "www.twitter.com",
    },
  },
  {
    id: "2",
    name: "sam",
    password: "12345",
    APIKey: "asdfghj",
    commands: {
      g: "www.google.com",
      tw: "www.twitter.com",
    },
  },
  {
    id: "3",
    name: "jane",
    password: "qwerty",
    APIKey: "zxerfgthy,",
    commands: {
      fb: "www.facebook.com",
      g: "www.google.com",
      gh: "www.github.com",
    },
  },
  {
    id: "4",
    name: "susan",
    password: "abcdefg",
    APIKey: "ewrfgtyhn",
    commands: {
      bbc: "www.bbc.co.uk",
      sport: "www.bbc.co.uk/sports",
      g: "www.google.com",
      gh: "www.github.com",
    },
  },
  {
    id: "5",
    name: "testing",
    password: "password",
    APIKey: "zxcvbn",
    commands: {
      search: "www.google.com",
    },
  },
];
