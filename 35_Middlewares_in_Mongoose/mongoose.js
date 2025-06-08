import mongoose from "mongoose";

//? Mongoose is a Object Document Mapping (ODM) library for MongoDB and Node.js. 
//? It provides a higher level of abstraction on top of MongoDB, making it easier to work with MongoDB in Node.js applications.

//? connect to database
try {
    await mongoose.connect("mongodb://127.0.0.1:27017");
    console.log("Database connected successfully");
    mongoose.set("debug", true);
} catch (error) {
    console.log(error);
    process.exit();
}


//? create schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
            min: 18,
        },
        password: {
            type: String,
            required: true,
        }

        // createdAt: {
        //     type: Date,
        //     default: Date.now()
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now()
        // }

    },
    {
        timestamps: true
    }
);

//? middlewares: always create before creating model
// userSchema.pre(["updateOne", "updateMany", "findOneAndUpdate"], function (next) {
//     console.log("this: ", this);
//     this.set({ updatedAt: Date.now() });
//     next();
// });

//? create model
const User = mongoose.model("User", userSchema);


// await User.create(
//     {
//         name: "Aavash Dhami",
//         age: 18,
//         email: "aavashdhami23@gmail.com",
//         password: "123456",
//     }
// );



await User.updateOne(
    {
        name: "Aavash Dhami"
    },
    {
        $set: {
            age: 18
        }
    }
);

await mongoose.connection.close();
