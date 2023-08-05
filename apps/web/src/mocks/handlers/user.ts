import { APIURL } from "@utils/api/endpoints";
import type { ErrorResponse, User } from "@utils/api/types";
import type { PathParams } from "msw";
import { rest } from "msw";
import { mockUsers } from "../mockUserData";

export const user = [
  rest.get<null, PathParams, User | ErrorResponse>(
    APIURL.USER,
    async (req, res, ctx) => {
      const { cookies } = req;
      const user = mockUsers.find(
        (user) => user.api_key === cookies.bookshelftest
      );
      if (!user) {
        return res(
          ctx.status(404),
          ctx.json({
            status: 404,
            title: JSON.stringify(req),
            detail: JSON.stringify(ctx),
          } as ErrorResponse)
        );
      }
      return res(ctx.status(200), ctx.json(user));
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
