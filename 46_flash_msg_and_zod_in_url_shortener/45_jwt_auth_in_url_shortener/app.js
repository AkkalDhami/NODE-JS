import express from "express";
import { shortnerRoutes } from "./routes/urlRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyAuthentication } from "./middlewares/authMiddleware.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views');

app.use(cookieParser());
app.use(cors());

app.use(verifyAuthentication);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
})

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", shortnerRoutes);
app.use("/auth", authRoutes);

const PORT = 3032

// await db.connect();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});