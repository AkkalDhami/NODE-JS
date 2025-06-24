import { nanoid } from "nanoid";
import { Url } from "../models/url.js";

export const postNewUrl = async (req, res) => {
    const shortId = nanoid(4);
    await Url.create({
        redirectUrl: req.body.redirectUrl,
        shortId: shortId,
        visitHistory: []
    });

    return res.redirect("/");
}
export const postDeleteUrl = async (req, res) => {
    const shortId = req.params.shortId;
    await Url.deleteOne({ shortId: shortId });

    return res.redirect("/");
}