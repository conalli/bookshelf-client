export function CurrentFolderBreadcrumbs({ path }: { path: string }) {
  const currentPath = path.split(",").filter((s) => s !== "");
  if (!currentPath.length) {
    currentPath.push("");
  }
  return (
    <div className="flex gap-2">
      {currentPath.map((f) => (
        <div className="">
          <span className="rounded-full p-1">/</span>
          {f.length > 0 && (
            <span className="border-bk-blue/20 rounded-full border bg-white px-2 py-1 dark:border-white/20 dark:bg-neutral-800 ">
              {f}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
