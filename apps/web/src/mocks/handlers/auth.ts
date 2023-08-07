import type { PathParams } from "msw";
import { rest } from "msw";
import { APIURL } from "../../utils/api/endpoints";
import type { AuthRequest, ErrorResponse, User } from "../../utils/api/types";
import type { MockUser } from "../mockUserData";
import { mockUsers } from "../mockUserData";

export const auth = [
  rest.post<AuthRequest, PathParams, User | ErrorResponse>(
    `${APIURL.AUTH}/login`,
    async (req, res, ctx) => {
      const request = await req.json<AuthRequest>();
      const found = mockUsers.find(
        (user) =>
          user.email === request.email && user.password === request.password
      );
      if (found) {
        const data = found as User;
        return res(
          ctx.status(200),
          ctx.cookie("bookshelftest", data.api_key),
          ctx.json(data)
        );
      }
      return res(
        ctx.status(400),
        ctx.json({ status: 400, title: "bad request", detail: "not found" })
      );
    }
  ),
  rest.post<AuthRequest, PathParams, User | ErrorResponse>(
    `${APIURL.AUTH}/signup`,
    async (req, res, ctx) => {
      const { email, password } = (await req.json()) as AuthRequest;
      const found = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (found) {
        return res(
          ctx.status(400),
          ctx.json({ status: 400, title: "bad request", detail: "not found" })
        );
      }
      const newUser: MockUser = {
        id: "new_user_id",
        api_key: "new_user_apiKey",
        email,
        email_verified: false,
        name: "new_user",
        given_name: "",
        family_name: "",
        locale: "",
        picture: "",
        provider: "bookshelftest",
        password,
        cmds: {},
      };
      mockUsers.push(newUser);
      return res(
        ctx.status(200),
        ctx.cookie("bookshelftest", newUser.api_key),
        ctx.json(newUser as User)
      );
    }
  ),
  rest.post<null>(`${APIURL.AUTH}/refresh`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
