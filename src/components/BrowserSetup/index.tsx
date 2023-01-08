import React, { useState } from "react";
import { copyToClipboard } from "../../utils/copyToClipboard";

const BrowserSetup = () => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyURL = () => {
    copyToClipboard(`https://bookshelf-6ii7.onrender.com/api/search/%s`);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col p-3 lg:p-6">
      <h1 className="text-3xl py-1 md:py-2">Browser Setup: </h1>
      <div>
        <p>
          Current examples use Google Chrome, however setup is similar across
          browsers.
        </p>
        <br />
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
                  } dark:bg-bk-blue p-2 hover:opacity-90 rounded shadow-md`}
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

export default BrowserSetup;
