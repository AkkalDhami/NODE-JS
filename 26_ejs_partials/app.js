import express from "express";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", router);

app.get("/", (req, res) => {
    const user = {
        name: "Aavash",
        age: 24,
        address: "Kathmandu"
    };
    return res.render("index", { user });
});

router.get("/report", (req, res) => {
    const students = [
        {
            name: "Aavash Dhami",
            gpa: 3.5,
            address: "Kathmandu"
        },
        {
            name: "Akkal Dhami",
            gpa: 4.5,
            address: "Bardiya"
        },
    ];

    return res.render("report", { students });
})

router.get("/about", (req, res) => {
    res.render("about");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});