
//? What is Zod?
//* Zod is a TypeScript-first schema validation library for handling and validating data structures.

//*  It ensures data correctness and safety, making it useful for API validation, form validation, and runtime type safety.

import { z, ZodError } from "zod";

const ageSchema = z.number().min(18).max(100).int();
const userAge = 19;

const parseUserAge = ageSchema.parse(userAge);
const { data, error, success } = ageSchema.safeParse(userAge);
console.log(data, success, error);


try {
    const parseUserAge = ageSchema.parse(userAge);
    console.log(parseUserAge);
} catch (error) {
    if (error instanceof ZodError) {
        console.log(error.issues[0].message);
    } else {
        console.log("Error: ", error);
    }
}

//? Object Validations:

const userSchema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
});

const userData = {
    name: "John Doe",
    age: 25,
    email: "john@example.com"
};

const result = userSchema.safeParse(userData);
// console.log(result); // { success: true, data: { name: "John Doe", age: 25, email: "john@example.com" } }


const invalidUserData = { name: "John", age: "twenty", email: "notanemail" };

const result2 = userSchema.safeParse(invalidUserData);

if (!result2.success) {
    // console.log(result2.error.format());
}

//? String Validations:

const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(12).regex(/[A-Z]/, "Must contain an uppercase letter");

const password = passwordSchema.safeParse("Test123");
console.log(password.success); // true


//? Number Validations:

const age_Schema = z.number().min(18, "Must be at least 18").max(60);
const age = age_Schema.safeParse(17);
console.log(age.success); // false


//? Array Validations:

const numbersSchema = z.array(z.number());
const numbers = numbersSchema.safeParse([1, 2, 3]);
console.log(numbers.success); // true


//? Optional & Default Values
const ageSchema2 = z.number().refine((age) => age % 2 === 0, {
    message: "Age must be even",
});

console.log(ageSchema2.safeParse(21).error?.errors[0].message); // Age must be even

//? Parsing API Data

//* Zod is useful for validating API responses:

fetch("https://api.example.com/user")
    .then((res) => res.json())
    .then((data) => {
        const result = userSchema.safeParse(data);
        if (!result.success) {
            console.error("Invalid API response:", result.error);
        }
    });
