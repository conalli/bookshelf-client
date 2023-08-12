import { getUser } from "@bookshelf-client/api";
import Help from ".";

export default async function HelpPage() {
  const userData = await getUser();
  return <Help userData={userData} />;
}
