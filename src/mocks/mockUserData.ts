import { MockUser } from "./mockTypes"
export const mockUsers: MockUser[] = [
  {
    id: "1", 
    name: "tom", 
    password: "password", 
    apiKey: "qwertyuiop", 
    commands: {
      "g": "www.google.com",
      "fb": "www.facebook.com",
      "tw": "www.twitter.com",
    }
  },
  {
    id: "2", 
    name: "sam", 
    password: "12345", 
    apiKey: "asdfghj", 
    commands: {
      "g": "www.google.com",
      "tw": "www.twitter.com",
    }
  },
  {
    id: "3", 
    name: "jane", 
    password: "qwerty", 
    apiKey: "zxerfgthy,", 
    commands: {
      "fb": "www.facebook.com",
      "g": "www.google.com",
      "gh": "www.github.com",
    }
  },
  {
    id: "4", 
    name: "susan", 
    password: "abcdefg", 
    apiKey: "ewrfgtyhn", 
    commands: {
      "bbc": "www.bbc.co.uk",
      "sport": "www.bbc.co.uk/sports",
      "g": "www.google.com",
      "gh": "www.github.com",
    }
  },
  {
    id: "5", 
    name: "testing", 
    password: "password", 
    apiKey: "zxcvbn", 
    commands: {
      "search": "www.google.com"
    }
  },
]