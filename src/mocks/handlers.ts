import { PathParams, rest } from "msw";
import { AuthRequest } from "../utils/api/request";
import { mockUsers, MockUser } from "./mockUserData";
import { APIURL } from "../utils/api/endpoints";
import { User } from "../utils/api/types";
import { ErrorResponse } from "../utils/api/response";

export const handlers = [
  rest.post<AuthRequest, PathParams, User | ErrorResponse>(
    `${APIURL.AUTH}/login`,
    (req, res, ctx) => {
      const found = mockUsers.find(
        (user) =>
          user.email === req.body.email && user.password === req.body.password
      );
      if (found) {
        const data = {} as User;
        return res(
          ctx.status(200),
          ctx.json({
            ...data,
            id: found.id,
            api_key: found.api_key,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
          })
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
    (req, res, ctx) => {
      const { email, password } = req.body;
      const found = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
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
      if (!found) {
        const data = {} as User;
        return res(
          ctx.status(200),
          ctx.json({
            ...data,
            id: newUser.id,
            APIKey: newUser.api_key,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
          })
        );
      }
      return res(
        ctx.status(400),
        ctx.json({ status: 400, title: "bad request", detail: "not found" })
      );
    }
  ),
  //   rest.get(`${APIURL.getCmds}`, (req, res, ctx) => {
  //     const found = mockUsers.find((user) => user.api_key === APIKey);
  //     if (!found) {
  //       return res(ctx.status(400), ctx.json({ status: "error" }));
  //     }
  //     return res(ctx.status(200), ctx.json(found.cmds));
  //   }),
  //   rest.patch<AddCommandRequest, { APIKey: string }, AddCommandResponse | ErrRes>(
  //     `${APIURL.addCmd}:APIKey`,
  //     (req, res, ctx) => {
  //       const { APIKey } = req.params;
  //       const { cmd, url } = req.body;
  //       const found = mockUsers.find((user) => user.APIKey === APIKey);
  //       if (!found) {
  //         return res(
  //           ctx.status(400),
  //           ctx.json({
  //             numUpdated: 0,
  //             status: 400,
  //             statusText: "OK",
  //             headers: {},
  //             config: {},
  //           })
  //         );
  //       }
  //       found.commands[cmd] = url;
  //       return res(
  //         ctx.status(200),
  //         ctx.json({
  //           numUpdated: 1,
  //           status: 200,
  //           statusText: "OK",
  //           headers: {},
  //           config: {},
  //         })
  //       );
  //     }
  //   ),
  //   rest.patch<DeleteCommandRequest, { APIKey: string }, DeleteCommandResponse | ErrRes>(
  //     `${APIURL.delCmd}:APIKey`,
  //     (req, res, ctx) => {
  //       const { APIKey } = req.params;
  //       const { id, cmd } = req.body;
  //       const found = mockUsers.find(
  //         (user) => user.APIKey === APIKey && user.id === id
  //       );
  //       if (!found) {
  //         return res(
  //           ctx.status(400),
  //           ctx.json({
  //             numUpdated: 0,
  //             status: 400,
  //             statusText: "OK",
  //             headers: {},
  //             config: {},
  //           })
  //         );
  //       }
  //       delete found.commands[cmd];
  //       return res(
  //         ctx.status(200),
  //         ctx.json({
  //           numUpdated: 1,
  //           status: 200,
  //           statusText: "OK",
  //           headers: {},
  //           config: {},
  //         })
  //       );
  //     }
  //   ),
  //   rest.delete<DelACCReq, { APIKey: string }, DelACCRes>(
  //     `${APIURL.BASE}/:APIKey`,
  //     (req, res, ctx) => {
  //       const { APIKey } = req.params;
  //       const { id, name, password } = req.body;
  //       const found = mockUsers.find(
  //         (user) =>
  //           user.APIKey === APIKey && user.id === id && user.password === password
  //       );
  //       if (!found) {
  //         return res(
  //           ctx.status(400),
  //           ctx.json({
  //             name,
  //             numDeleted: 0,
  //             users: mockUsers,
  //             status: 400,
  //             statusText: "OK",
  //             headers: {},
  //             config: {},
  //           })
  //         );
  //       }
  //       mockUsers.filter(
  //         (user) =>
  //           user.id !== id &&
  //           user.APIKey !== APIKey &&
  //           user.name !== name &&
  //           user.password !== password
  //       );
  //       return res(
  //         ctx.status(200),
  //         ctx.json({
  //           name,
  //           numDeleted: 1,
  //           users: mockUsers,
  //           status: 200,
  //           statusText: "OK",
  //           headers: {},
  //           config: {},
  //         })
  //       );
  //     }
  //   ),
];
