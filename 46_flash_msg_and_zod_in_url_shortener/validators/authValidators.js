import zod from "zod";

export const registerSchema = zod.object({
    name: zod.string().trim()
        .min(3, {
            message: "Name must be at least 3 characters long"
        })
        .max(50, {
            message: "Name must be at most 50 characters long"
        }),
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
