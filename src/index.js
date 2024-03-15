const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        dob: req.body.dob
    };

    try {
        const result = await collection.create(userData);
        console.log("User registered:", result);
        res.render("login");
    } catch (error) {
        console.error("Error registering user:", error);
        res.render("error");
    }
});

app.post("/login", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    
    try {
        // Check if the user exists and password is correct in your database
        // You might want to query your database to verify the login information
        // For example:
        const user = await collection.findOne({ name: data.name, password: data.password });
        if (user) {
            res.render("home");
        } else {
            res.render("login", { error: "Invalid login credentials" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.render("error");
    }
});

app.get("/profile", async (req, res) => {
    try {
        // Fetch the user's data from the database based on the user's name
        const user = await collection.findOne({ name: req.body.name });
        if (user) {
            // Render the profile page with the user's data
            res.render("profile", { 
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                dob: user.dob
            });
        } else {
            // Handle the case where the user is not found
            res.render("error", { error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.render("error");
    }
});


/*app.get("/profile", (req, res) => {
    res.render("profile");
});
/*
app.post("/update-profile", async (req, res) => {
    const data = {
        bio: req.body.bio,
        password: req.body.password,
        // You can add other fields here if needed
    };

    try {
        // Update the user's profile details in the database
        // You'll need to adjust the query based on your database structure
        // For example:
        const updatedUser = await collection.findOneAndUpdate({ name: "user's name" }, { $set: data });
        console.log("Profile updated:", updatedUser);
        res.redirect("/profile"); // Redirect back to the profile page
    } catch (error) {
        console.error("Error updating profile:", error);
        res.render("error");
    }
});*/

app.get("/general", (req, res) => {
    res.render("general");
});

app.get("/business", (req, res) => {
    res.render("business");
});

app.get("/sports", (req, res) => {
    res.render("sports");
});

app.get("/technology", (req, res) => {
    res.render("technology");
});

app.get("/entertainment", (req, res) => {
    res.render("entertainment");
});

app.get("/chatbot", (req, res) => {
    res.render("chatbot");
});

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});