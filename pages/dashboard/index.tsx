import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../../src/hooks/useAuth";
import {
  useGetCmdData,
  useAddCmdData,
  useDelCmdData,
} from "../../src/hooks/useCmdData";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useGetCmdData(
    user.apiKey,
    () => console.log("Success!"),
    () => console.log("Error!")
  );
  const add = useAddCmdData();
  const del = useDelCmdData();
  if (!user) {
    router.push("/signin");
    return null;
  }
  return (
    <>
      <h1>Dashboard</h1>
      <div className="bg-yellow-200">
        <button
          onClick={() =>
            add.mutate({
              apiKey: "ewrfgtyhn",
              body: {
                id: "4",
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
              apiKey: "ewrfgtyhn",
              body: {
                id: "4",
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
    </>
  );
};

export default Dashboard;
