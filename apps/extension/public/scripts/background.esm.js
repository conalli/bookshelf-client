const defaultSuggestions = [
    {
        content: "https://bookshelf.conalli.info/signin",
        description: "<hint>Sign in | <url>https://bookshelf.conalli.info/signin</url></hint>",
        deletable: false
    },
    {
        content: "https://bookshelf.conalli.info/signup",
        description: "<hint>Sign up | <url>https://bookshelf.conalli.info/signup</url></hint>",
        deletable: false
    }
];

chrome.runtime.onInstalled.addListener(({ reason })=>{
    if (reason !== "install") {
        return;
    }
    console.log("HELLO FROM BOOKSHELF");
});
chrome.omnibox.onInputChanged.addListener((text, suggest)=>{
    console.log(text);
    suggest(defaultSuggestions);
});
chrome.omnibox.onInputEntered.addListener(async (text, disposition)=>{
    console.log(disposition);
    await chrome.tabs.update({
        url: text
    });
});
