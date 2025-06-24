import express from "express";
const app = express();
import { urlRouter } from "./routes/url.js";
import { connect } from "./connect.js";
import { Url } from "./models/url.js";
import { staticRouter } from "./routes/staticRouter.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", staticRouter);

app.use("/url", urlRouter);

await connect("mongodb://127.0.0.1:27017/urlShortener")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({ shortId: shortId },
        {
            $push:
            {
                visitHistory: { timestamp: Date.now() }
            }
        });

    if (entry) {
        return res.redirect(entry.redirectUrl);
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
