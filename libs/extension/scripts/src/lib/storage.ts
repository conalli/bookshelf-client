const STATUS = "BOOKSHELF_USER_STATUS";

export function watchChanges(changes: {
  [name: string]: chrome.storage.StorageChange;
}) {
  if (STATUS in changes) {
    console.log(changes[STATUS]);
  }
}
