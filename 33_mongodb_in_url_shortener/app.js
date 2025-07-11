import express from "express";
import { shortnerRoutes } from "./routes/shortner.routes.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", shortnerRoutes);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});