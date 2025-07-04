import { db } from "../config/db-config.js";
import { usersTable } from "../drizzle/schema.js";
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email) {
    const result = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
    console.log("RESULT: ", result)
    return result[0];
};

export const createUser = async (name, email, password, created_at) => {
    try {
        return await db.insert(usersTable).values({ name, email, password, created_at });
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};