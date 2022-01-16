/* eslint-disable @typescript-eslint/ban-types */
import { PathParams, rest } from "msw";
import { DelACCReq, DelACCRes, DelCMDReq, DelCMDRes, ErrRes, LogInReq, LogInRes, SetCMDReq, SetCMDRes, SignUpReq, SignUpRes} from "./mockTypes";
import { mockUsers } from "./mockUserData";
// import { ReqURL } from "../components/Auth/endpoints";

// TODO: Fix URLs

const ReqURL = () => {
  return {
    base: "",
    get: "",
    set: "",
    del: "",
    delAcc: "",
  }
}

export const handlers = [
  rest.post<LogInReq, PathParams, LogInRes | ErrRes>(`${ReqURL().base}login`, (req, res, ctx) => {
    const {name, password} = req.body;
    const found = mockUsers.find((user) => user.name === name && user.password === password)
    if (found) {
      return res(
          ctx.status(200),
          ctx.json({id: found.id, apiKey: found.apiKey})    
      )
    }
    return res(
      ctx.status(400),
      ctx.json({"status": "error"}),
    )
    }
  ),
  rest.post<SignUpReq, PathParams, SignUpRes | ErrRes>(`${ReqURL().base}signup`, (req, res, ctx) => {
    const {name, password} = req.body;
    const found = mockUsers.find((user) => user.name === name && user.password === password)
    if (!found) {
      return res(
          ctx.status(200),
          ctx.json({id: "new_user_id", apiKey: "new_user_apiKey"}) 
      )
    }
    return res(
      ctx.status(400),
      ctx.json({"status": "error"}),
    )
    }),
  rest.get(`${ReqURL().get}:apiKey`, (req, res, ctx) => {
    const { apiKey } = req.params;
    const found = mockUsers.find((user) => user.apiKey === apiKey)
    if (!found) {
      return res(
          ctx.status(400),
          ctx.json({"status": "error"})    
      )
    }
    return res(
      ctx.status(200),
      ctx.json(found.commands),
    )
    }),
  rest.put<SetCMDReq, {apiKey: string}, SetCMDRes | ErrRes>(`${ReqURL().set}:apiKey`, (req, res, ctx) => {
    const { apiKey } = req.params;
    const {cmd, url} = req.body;
    const found = mockUsers.find((user) => user.apiKey === apiKey)
    if (!found) {
      return res(
        ctx.status(400),
        ctx.json({numUpdated: 0})    
        )
      }
    found.commands[cmd] = url;
    return res(
      ctx.status(200),
      ctx.json({numUpdated: 1}),
    )
    }),
  rest.put<DelCMDReq, {apiKey: string}, DelCMDRes | ErrRes>(`${ReqURL().del}:apiKey`, (req, res, ctx) => {
    const { apiKey } = req.params;
    const {id, cmd} = req.body;
    const found = mockUsers.find((user) => user.apiKey === apiKey && user.id === id)
    if (!found) {
      return res(
        ctx.status(400),
        ctx.json({numUpdated: 0})    
        )
      }
    delete found.commands[cmd];
    return res(
      ctx.status(200),
      ctx.json({numUpdated: 1}),
    )
    }),
  rest.delete<DelACCReq, {apiKey: string}, DelACCRes | ErrRes>(`${ReqURL().delAcc}:apiKey`, (req, res, ctx) => {
    const { apiKey } = req.params;
    const {id, name, password} = req.body;
    const found = mockUsers.find((user) => user.apiKey === apiKey && user.id === id && user.password === password)
    if (!found) {
      return res(
        ctx.status(400),
        ctx.json({name,numDeleted: 0, users: mockUsers})    
        )
      }
    mockUsers.filter(user => user.id !== id && user.apiKey !== apiKey && user.name !== name && user.password !== password);
    return res(
      ctx.status(200),
      ctx.json({name, numDeleted: 1, users: mockUsers}),
    )
    }),
]