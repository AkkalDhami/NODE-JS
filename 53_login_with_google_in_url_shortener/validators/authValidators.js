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

export const changePasswordSchema = zod.object({
    currentPassword: zod.string().trim()
        .min(1, {
            message: "Current password is required"
        })
        .max(80, {
            message: "Password must be at most 80 characters long"
        }),
    newPassword: zod.string().trim()
        .min(6, {
            message: "Password must be at least 6 characters long"
        })
        .max(80, {
            message: "Password must be at most 80 characters long"
        }),
    confirmNewPassword: zod.string().trim()
        .min(6, {
            message: "Password must be at least 6 characters long"
        })
        .max(80, {
            message: "Password must be at most 80 characters long"
        }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
});