import { ReactElement, useState } from "react";
import CommandTable from "../../src/components/CommandTable";
import RouteGuard from "../../src/components/RouteGuard";
import { useAuth } from "../../src/hooks/useAuth";
import { useAddCmdData, useDelCmdData } from "../../src/hooks/useCmdData";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const { user, logOut } = useAuth();
  const add = useAddCmdData();
  const del = useDelCmdData();
  const [curr, setCurr] = useState(0);
  if (!user) return null;
  const list = [
    {
      id: user.id,
      cmd: "oa",
      url: "ok.com",
    },
    {
      id: user.id,
      cmd: "ob",
      url: "ok.com",
    },
    {
      id: user.id,
      cmd: "oc",
      url: "ok.com",
    },
    {
      id: user.id,
      cmd: "od",
      url: "ok.com",
    },
  ];
  return (
    <>
      <h1>Dashboard</h1>
      <div className="">
        <button
          onClick={() => {
            console.log(list[curr]);
            console.log(curr);
            add.mutate({
              apiKey: user.apiKey,
              body: list[curr],
            });
            setCurr(curr + 1);
          }}
        >
          Add
        </button>
      </div>
      <CommandTable del={del} user={user} />
      <button onClick={logOut}>Log out</button>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <RouteGuard>{page}</RouteGuard>;
};

export default Dashboard;
