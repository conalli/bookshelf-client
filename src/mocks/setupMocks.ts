const BROWSER = typeof window !== "undefined";

export const setupMocks = async () => {
  if (BROWSER) {
    const { worker } = await import("./browser");
    worker.start();
  } else {
    const { server } = await import("./server");
    server.listen();
  }
};
