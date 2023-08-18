import { defaultSuggestions } from "./lib/search";
import { watchChanges } from "./lib/storage";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason !== "install") {
    return;
  }
  console.log("HELLO FROM BOOKSHELF");
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log(text);
  suggest(defaultSuggestions);
});

chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
  console.log(disposition);
  await chrome.tabs.update({ url: text });
});

chrome.storage.local.onChanged.addListener(watchChanges);
