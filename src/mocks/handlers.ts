import { PathParams, rest } from "msw";
import { ErrRes } from "./mockTypes";
import {
  DelACCReq,
  DelACCRes,
  DelCMDReq,
  DelCMDRes,
  LogInRes,
  AddCMDReq,
  AddCMDRes,
  SignUpReq,
  SignUpRes,
} from "../utils/APITypes";
import { mockUsers } from "./mockUserData";
import { ReqURL } from "../utils/APIEndpoints";
import { AxiosResponse } from "axios";

type header = {
  "Content-Type": string;
};
type axiosReqBody = {
  credentials: string;
  body: string;
  headers: header;
};

export const handlers = [
  rest.post<axiosReqBody, PathParams, AxiosResponse<LogInRes> | ErrRes>(
    `${ReqURL.base}login`,
    (req, res, ctx) => {
      const dataString = req.body.body;
      console.log("data: ", dataString, "typeof: ", typeof dataString);
      const data = JSON.parse(dataString);
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
  rest.post<SignUpReq, PathParams, SignUpRes | ErrRes>(
    `${ReqURL.base}signup`,
    (req, res, ctx) => {
      const { name, password } = req.body;
      const found = mockUsers.find(
        (user) => user.name === name && user.password === password
      );
      if (!found) {
        return res(
          ctx.status(200),
          ctx.json({ id: "new_user_id", apiKey: "new_user_apiKey" })
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
  rest.put<AddCMDReq, { apiKey: string }, AddCMDRes | ErrRes>(
    `${ReqURL.addCmd}:apiKey`,
    (req, res, ctx) => {
      const { apiKey } = req.params;
      const { cmd, url } = req.body;
      const found = mockUsers.find((user) => user.apiKey === apiKey);
      if (!found) {
        return res(ctx.status(400), ctx.json({ numUpdated: 0 }));
      }
      found.commands[cmd] = url;
      return res(ctx.status(200), ctx.json({ numUpdated: 1 }));
    }
  ),
  rest.put<DelCMDReq, { apiKey: string }, DelCMDRes | ErrRes>(
    `${ReqURL.delCmd}:apiKey`,
    (req, res, ctx) => {
      const { apiKey } = req.params;
      const { id, cmd } = req.body;
      const found = mockUsers.find(
        (user) => user.apiKey === apiKey && user.id === id
      );
      if (!found) {
        return res(ctx.status(400), ctx.json({ numUpdated: 0 }));
      }
      delete found.commands[cmd];
      return res(ctx.status(200), ctx.json({ numUpdated: 1 }));
    }
  ),
  rest.delete<DelACCReq, { apiKey: string }, DelACCRes | ErrRes>(
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
          ctx.json({ name, numDeleted: 0, users: mockUsers })
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
        ctx.json({ name, numDeleted: 1, users: mockUsers })
      );
    }
  ),
];
