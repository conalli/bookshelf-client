import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./src/mocks/server";
beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
