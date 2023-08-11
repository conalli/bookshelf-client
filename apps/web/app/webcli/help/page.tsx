import { getUser } from "@bookshelf-client/utils";
import Help from ".";

export default async function HelpPage() {
  const userData = await getUser();
  return <Help userData={userData} />;
}
