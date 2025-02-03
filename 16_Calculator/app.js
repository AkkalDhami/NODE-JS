import { createServer } from "http";

import { requestHandler } from "./request.js";

const PORT = 3000;
const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
