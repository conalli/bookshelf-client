import { SearchURL, copyToClipboard } from "@bookshelf-client/utils";
import { useState } from "react";

export const BrowserSetup = () => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyURL = () => {
    copyToClipboard(`${SearchURL}/%s`);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col p-3 lg:p-6">
      <h1 className="py-1 text-3xl md:py-2">Browser Setup: </h1>
      <div>
        <p>
          Current examples use Google Chrome, however setup is similar across
          browsers.
        </p>
        <br />
        <ol>
          <li>
            <p>
              First, find the <span className="text-bk-orange">settings</span>{" "}
              page for your browser.
            </p>
          </li>
          <li>
            <p>
              Next, locate the{" "}
              <span className="text-bk-red">Search engine</span> tab on the left
              hand side.
            </p>
          </li>
          <li>
            <p>
              Click <span className="text-bk-blue">Manage search engines</span>{" "}
              .
            </p>
          </li>
          <li>
            <p>
              In the{" "}
              <span className="text-bk-orange">Other search engines</span>{" "}
              section, click <span className="text-bk-red">Add</span>.
            </p>
          </li>
          <li>
            <br />
            <ul>
              <li>
                <p>
                  Under <span className="text-bk-blue">search engine </span>,
                  choose a name; e.g. Bookshelf.
                </p>
              </li>
              <li>
                <p>
                  Under <span className="text-bk-orange">Keyword </span>, choose
                  a keyword to invoke Bookshelf; e.g. bk, shelf, etc.
                </p>
              </li>
              <li>
                <p>
                  Under <span className="text-bk-red">URL </span>, copy and
                  paste the search URL.
                </p>
                <button
                  className={`${
                    isCopied ? "bg-green-400 " : "bg-bk-orange "
                  } dark:bg-bk-blue rounded p-2 shadow-md hover:opacity-90`}
                  onClick={handleCopyURL}
                >
                  {isCopied ? "copied" : "copy"}
                </button>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};
