import { NextPage } from "next";
import Nav from "../../src/components/Nav";
import { useAuth } from "../../src/hooks/useAuth";
import {
  useGetCmdData,
  useAddCmdData,
  useDelCmdData,
} from "../../src/hooks/useCmdData";

const Dashboard: NextPage = () => {
  const { user, logOut } = useAuth();
  const { data } = useGetCmdData(
    user?.apiKey,
    () => console.log("Success!"),
    () => console.log("Error!")
  );
  const add = useAddCmdData();
  const del = useDelCmdData();

  if (!user) return null;
  return (
    <>
      <Nav />
      <h1>Dashboard</h1>
      <div className="bg-yellow-200">
        <button
          onClick={() =>
            add.mutate({
              apiKey: user.apiKey,
              body: {
                id: user.id,
                cmd: "ok",
                url: "ok.com",
              },
            })
          }
        >
          Add
        </button>
        <button
          onClick={() =>
            del.mutate({
              apiKey: user.apiKey,
              body: {
                id: user.id,
                cmd: "ok",
              },
            })
          }
        >
          Del
        </button>
        {data &&
          Object.keys(data.data).map((cmd) => (
            <h5 key={cmd} className="text-gray-900">
              {cmd}:{data.data[cmd]}
            </h5>
          ))}
      </div>
      <button onClick={logOut}>Log out</button>
    </>
  );
};

export default Dashboard;
