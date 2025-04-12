import { httpServer } from "./server/server";

(async () => {
  httpServer.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
})();
