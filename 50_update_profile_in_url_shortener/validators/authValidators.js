import zod from "zod";

const nameSchema = zod.string().trim()
    .min(3, {
        message: "Name must be at least 3 characters long"
    })
    .max(50, {
        message: "Name must be at most 50 characters long"
    });

export const registerSchema = zod.object({
    name: nameSchema,
    email: zod.string().trim().email({
        message: "Invalid email address"
    }),
    password: zod.string().trim()
        .min(6, {
            message: "Password must be at least 6 characters long"
        })
        .max(80, {
            message: "Password must be at most 80 characters long"
        })
});

export const loginSchema = zod.object({
    email: zod.string().trim().email({ message: "Invalid email address" }),
    password: zod.string().trim()
});


export const verifyEmailSchema = zod.object({
    token: zod.string().trim().length(8, { message: "Invalid token" }),
    email: zod.string().trim().email(),
});

export const verifyProfileSchema = zod.object({
    name: nameSchema
});