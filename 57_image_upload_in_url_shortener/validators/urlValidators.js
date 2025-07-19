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

// searchParams
export const shortenerSearchParamsSchema = zod.object({
    page: zod.coerce
        .number()
        .int()
        .positive()
        .min(1)
        .optional() // optional must come before default, otherwise default value won't be set.
        .default(1)
        .catch(1), // if validation error occurs, then it will choose 1. it is necessary, otherwise if validation fails then 500 will occur
});