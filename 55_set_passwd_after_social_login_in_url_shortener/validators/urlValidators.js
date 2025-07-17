import zod from "zod";

export const urlSchema = zod.object({
    url: zod.string({ required_error: "URL is required" })
        .trim()
        .url({ message: "Please enter a valid URL" })
        .max(1024, { message: "URL must be at most 1024 characters long" }),
    shortCode: zod.string({ required_error: "Short code is required" }).trim()
        .max(20, { message: "Short code must be at most 20 characters long" })
        .min(2, { message: "Short code must be at least 2 characters long" })
        .optional()

});