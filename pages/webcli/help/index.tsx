import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Help = () => {
  const { data: refreshedToken } = useRefreshTokens();
  if (refreshedToken) {
    console.log("tokens refreshed");
  }
  return (
    <div>
      <h1>Help</h1>
      <table>
        <thead>
          <tr>
            <th className="pr-4">Command</th>
            <th className="pr-4">Flags</th>
            <th className="pr-4">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b-2 py-1"></td>
            <td className="border-b-2"></td>
            <td className="border-b-2"></td>
          </tr>
          <tr>
            <td className="py-2">touch / add</td>
            <td></td>
            <td>
              Create a command or bookmark with the given information. (default:
              bookmark) Add is an alias for touch.
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-b</td>
            <td>Create bookmark. (-url required)</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-c</td>
            <td>Create command with given name. (-url required)</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-url</td>
            <td>Url for given bookmark/command.</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-name</td>
            <td>Name for given bookmark to provide context.</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-path</td>
            <td>Folder path for given bookmark. (default: none)</td>
          </tr>
          <tr>
            <td className="border-b-2 py-1"></td>
            <td className="border-b-2"></td>
            <td className="border-b-2"></td>
          </tr>
          <tr>
            <td className="py-2">ls</td>
            <td> </td>
            <td>List commands or bookmarks. (default: bookmark).</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-b</td>
            <td>List bookmarks.</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-bf</td>
            <td>List bookmarks for a given bookmark folder.</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-bk-blue dark:text-bk-orange py-1">-c</td>
            <td>List commands.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Help;
