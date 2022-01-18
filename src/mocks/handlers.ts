import { PathParams, rest } from "msw";
import { ErrRes } from "./mockTypes";
import {
  DelACCReq,
  DelACCRes,
  DelCMDReq,
  DelCMDRes,
  LogInReq,
  LogInRes,
  AddCMDReq,
  AddCMDRes,
  SignUpReq,
  SignUpRes,
} from "../utils/APITypes";
import { mockUsers } from "./mockUserData";
import { ReqURL } from "../utils/APIEndpoints";
import { AxiosResponse } from "axios";

export const handlers = [
  rest.post<LogInReq, PathParams, AxiosResponse<LogInRes, LogInReq> | ErrRes>(
    `${ReqURL.base}login`,
    (req, res, ctx) => {
      const data = req.body;
      const found = mockUsers.find(
        (user) => user.name === data.name && user.password === data.password
      );
      console.log(found);
      if (found) {
        return res(
          ctx.status(200),
          ctx.json({
            data: { id: found.id, apiKey: found.apiKey },
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
  rest.post<SignUpReq, PathParams, AxiosResponse<SignUpRes> | ErrRes>(
    `${ReqURL.base}signup`,
    (req, res, ctx) => {
      const { name, password } = req.body;
      const found = mockUsers.find(
        (user) => user.name === name && user.password === password
      );
      if (!found) {
        return res(
          ctx.status(200),
          ctx.json({
            data: { id: "new_user_id", apiKey: "new_user_apiKey" },
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
  rest.get(`${ReqURL.getCmds}:apiKey`, (req, res, ctx) => {
    const { apiKey } = req.params;
    const found = mockUsers.find((user) => user.apiKey === apiKey);
    if (!found) {
      return res(ctx.status(400), ctx.json({ status: "error" }));
    }
    return res(ctx.status(200), ctx.json(found.commands));
  }),
  rest.put<AddCMDReq, { apiKey: string }, AxiosResponse<AddCMDRes> | ErrRes>(
    `${ReqURL.addCmd}:apiKey`,
    (req, res, ctx) => {
      const { apiKey } = req.params;
      const { cmd, url } = req.body;
      const found = mockUsers.find((user) => user.apiKey === apiKey);
      if (!found) {
        return res(
          ctx.status(400),
          ctx.json({
            data: { numUpdated: 0 },
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
          data: { numUpdated: 1 },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        })
      );
    }
  ),
  rest.put<DelCMDReq, { apiKey: string }, AxiosResponse<DelCMDRes>>(
    `${ReqURL.delCmd}:apiKey`,
    (req, res, ctx) => {
      const { apiKey } = req.params;
      const { id, cmd } = req.body;
      const found = mockUsers.find(
        (user) => user.apiKey === apiKey && user.id === id
      );
      if (!found) {
        return res(
          ctx.status(400),
          ctx.json({
            data: { numUpdated: 0 },
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
          data: { numUpdated: 1 },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        })
      );
    }
  ),
  rest.delete<DelACCReq, { apiKey: string }, AxiosResponse<DelACCRes>>(
    `${ReqURL.delAccount}:apiKey`,
    (req, res, ctx) => {
      const { apiKey } = req.params;
      const { id, name, password } = req.body;
      const found = mockUsers.find(
        (user) =>
          user.apiKey === apiKey && user.id === id && user.password === password
      );
      if (!found) {
        return res(
          ctx.status(400),
          ctx.json({
            data: { name, numDeleted: 0, users: mockUsers },
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
          user.apiKey !== apiKey &&
          user.name !== name &&
          user.password !== password
      );
      return res(
        ctx.status(200),
        ctx.json({
          data: { name, numDeleted: 1, users: mockUsers },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        })
      );
    }
  ),
];
