import express from "express";
import { shortnerRoutes } from "./routes/shortner.routes.js";
import { connectDB } from "./config/db-client.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", shortnerRoutes);

const PORT = 3002

await connectDB();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});