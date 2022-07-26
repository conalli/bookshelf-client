const Help = () => {
  return (
    <div>
      <h1>Help</h1>
      <table>
        <tr>
          <th>Command</th>
          <th>Flags</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>touch | add</td>
          <td> </td>
          <td>
            Create a command or bookmark with the given information. (default:
            bookmark) Add is an alias for touch.
          </td>
        </tr>
        <tr>
          <td></td>
          <td>-b</td>
          <td>Create bookmark. (-url required)</td>
        </tr>
        <tr>
          <td></td>
          <td>-c</td>
          <td>Create command with given name. (-url required)</td>
        </tr>
        <tr>
          <td></td>
          <td>-url</td>
          <td>Url for given bookmark/command.</td>
        </tr>
        <tr>
          <td></td>
          <td>-name</td>
          <td>Name for given bookmark to provide context.</td>
        </tr>
        <tr>
          <td></td>
          <td>-path</td>
          <td>Folder path for given bookmark. (default: none)</td>
        </tr>
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>ls</td>
          <td> </td>
          <td>List commands or bookmarks. (default: bookmark).</td>
        </tr>
        <tr>
          <td></td>
          <td>-b</td>
          <td>List bookmarks.</td>
        </tr>
        <tr>
          <td></td>
          <td>-c</td>
          <td>List commands.</td>
        </tr>
        <tr>
          <td></td>
          <td>-bf</td>
          <td>List bookmarks for a given bookmark folder.</td>
        </tr>
      </table>
    </div>
  );
};

export default Help;
