type Suggestion = {
  content: string;
  description: string;
  deletable?: boolean;
};

export const defaultSuggestions: Suggestion[] = [
  {
    content: "https://bookshelf.conalli.info/signin",
    description:
      "<hint>Sign in | <url>https://bookshelf.conalli.info/signin</url></hint>",
    deletable: false,
  },
  {
    content: "https://bookshelf.conalli.info/signup",
    description:
      "<hint>Sign up | <url>https://bookshelf.conalli.info/signup</url></hint>",
    deletable: false,
  },
];
