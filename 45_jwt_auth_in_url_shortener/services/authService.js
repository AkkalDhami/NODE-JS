import { db } from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";
import { eq } from 'drizzle-orm';
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function getUserByEmail(email) {
    const result = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
    return result[0];
};

export const createUser = async (name, email, password) => {
    try {
        return await db.insert(usersTable).values(name, email, password);
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};

export const hashedPassword = async (password) => argon2.hash(password);

export const verifyPassword = async (password, hashedPassword) => argon2.verify(hashedPassword, password);

export const generateToken = (id, email, name) => jwt.sign({ id, email, name }, process.env.JWT_SECRET, {
    expiresIn: "10d"
});

export const verifyJWTToken = (token) => jwt.verify(token, process.env.JWT_SECRET);