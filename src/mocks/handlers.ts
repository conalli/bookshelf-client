import { PathParams, rest } from "msw";
import { ErrRes, MockUser } from "./mockTypes";
import {
  DelACCReq,
  DelACCRes,
  DelCMDReq,
  DelCMDRes,
  LogInReq,
  AddCMDReq,
  AddCMDRes,
  SignUpReq,
  SignUpRes,
  LogInRes,
} from "../utils/APITypes";
import { mockUsers } from "./mockUserData";
import { ReqURL } from "../utils/APIEndpoints";

export const handlers = [
  rest.post<LogInReq, PathParams, LogInRes | ErrRes>(
    `${ReqURL.base}/login`,
    (req, res, ctx) => {
      const found = mockUsers.find(
        (user) =>
          user.name === req.body.name && user.password === req.body.password
      );
      if (found) {
        return res(
          ctx.status(200),
          ctx.json({
            id: found.id,
            APIKey: found.APIKey,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
          })
        );
      }
      return res(ctx.status(400), ctx.json({ status: "error" }));
    }
  ),
  rest.post<SignUpReq, PathParams, SignUpRes | ErrRes>(
    `${ReqURL.base}`,
    (req, res, ctx) => {
      const { name, password } = req.body;
      const found = mockUsers.find(
        (user) => user.name === name && user.password === password
      );
      const newUser: MockUser = {
        id: "new_user_id",
        APIKey: "new_user_apiKey",
        name,
        password,
        commands: {},
      };
      mockUsers.push(newUser);
      if (!found) {
        return res(
          ctx.status(200),
          ctx.json({
            id: newUser.id,
            APIKey: newUser.APIKey,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
          })
        );
      }
      return res(ctx.status(400), ctx.json({ status: "error" }));
    }
  ),
  rest.get(`${ReqURL.getCmds}:APIKey`, (req, res, ctx) => {
    const { APIKey } = req.params;
    const found = mockUsers.find((user) => user.APIKey === APIKey);
    if (!found) {
      return res(ctx.status(400), ctx.json({ status: "error" }));
    }
    return res(ctx.status(200), ctx.json(found.commands));
  }),
  rest.patch<AddCMDReq, { APIKey: string }, AddCMDRes | ErrRes>(
    `${ReqURL.addCmd}:APIKey`,
    (req, res, ctx) => {
      const { APIKey } = req.params;
      const { cmd, url } = req.body;
      const found = mockUsers.find((user) => user.APIKey === APIKey);
      if (!found) {
        return res(
          ctx.status(400),
          ctx.json({
            numUpdated: 0,
            status: 400,
            statusText: "OK",
            headers: {},
            config: {},
          })
        );
      }
      found.commands[cmd] = url;
      return res(
        ctx.status(200),
        ctx.json({
          numUpdated: 1,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        })
      );
    }
  ),
  rest.patch<DelCMDReq, { APIKey: string }, DelCMDRes | ErrRes>(
    `${ReqURL.delCmd}:APIKey`,
    (req, res, ctx) => {
      const { APIKey } = req.params;
      const { id, cmd } = req.body;
      const found = mockUsers.find(
        (user) => user.APIKey === APIKey && user.id === id
      );
      if (!found) {
        return res(
          ctx.status(400),
          ctx.json({
            numUpdated: 0,
            status: 400,
            statusText: "OK",
            headers: {},
            config: {},
          })
        );
      }
      delete found.commands[cmd];
      return res(
        ctx.status(200),
        ctx.json({
          numUpdated: 1,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        })
      );
    }
  ),
  rest.delete<DelACCReq, { APIKey: string }, DelACCRes>(
    `${ReqURL.base}/:APIKey`,
    (req, res, ctx) => {
      const { APIKey } = req.params;
      const { id, name, password } = req.body;
      const found = mockUsers.find(
        (user) =>
          user.APIKey === APIKey && user.id === id && user.password === password
      );
      if (!found) {
        return res(
          ctx.status(400),
          ctx.json({
            name,
            numDeleted: 0,
            users: mockUsers,
            status: 400,
            statusText: "OK",
            headers: {},
            config: {},
          })
        );
      }
      mockUsers.filter(
        (user) =>
          user.id !== id &&
          user.APIKey !== APIKey &&
          user.name !== name &&
          user.password !== password
      );
      return res(
        ctx.status(200),
        ctx.json({
          name,
          numDeleted: 1,
          users: mockUsers,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        })
      );
    }
  ),
];
