import express from "express";
import { shortnerRoutes } from "./routes/shortner.routes.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", shortnerRoutes);

const PORT = 3032

// await db.connect();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});