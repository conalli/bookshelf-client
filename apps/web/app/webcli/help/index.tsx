"use client";

import type { User } from "@bookshelf-client/api";
import { useGetUser } from "@bookshelf-client/hooks";

type HelpProps = {
  userData: User | null;
};

export default function Help({ userData }: HelpProps) {
  useGetUser(
    userData?.api_key,
    userData ? { initialData: userData } : undefined,
    true
  );
  return (
    <div className="px-8">
      <h1 className="py-3 text-4xl">WebCLI Help:</h1>
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
            <td className="py-1 text-bk-blue dark:text-bk-orange">-b</td>
            <td>Create bookmark. (-url required)</td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-bk-blue dark:text-bk-orange">-c</td>
            <td>Create command with given name. (-url required)</td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-bk-blue dark:text-bk-orange">-url</td>
            <td>Url for given bookmark/command.</td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-bk-blue dark:text-bk-orange">-name</td>
            <td>Name for given bookmark to provide context.</td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-bk-blue dark:text-bk-orange">-path</td>
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
            <td className="py-1 text-bk-blue dark:text-bk-orange">-b</td>
            <td>List bookmarks.</td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-bk-blue dark:text-bk-orange">-bf</td>
            <td>List bookmarks for a given bookmark folder.</td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-bk-blue dark:text-bk-orange">-c</td>
            <td>List commands.</td>
          </tr>
          <tr>
            <td className="border-b-2 py-1"></td>
            <td className="border-b-2"></td>
            <td className="border-b-2"></td>
          </tr>
          <tr>
            <td className="py-2">help</td>
            <td> </td>
            <td>View this help page.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
