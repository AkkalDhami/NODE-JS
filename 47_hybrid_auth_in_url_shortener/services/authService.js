import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { db } from "../config/db.js";
import { sessionsTable, shortLinksTable, usersTable } from "../drizzle/schema.js";
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
        return await db.insert(usersTable).values(name, email, password).$returningId()
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};

export const hashedPassword = async (password) => argon2.hash(password);

export const verifyPassword = async (password, hashedPassword) => argon2.verify(hashedPassword, password);


export const createSession = async (userId, { ip, userAgent }) => {
    const session = await db.insert(sessionsTable).values({ userId, ip, userAgent }).$returningId()
    return session
}

export const generateAccessToken = ({ id, name, email, sessionId }) => {
    return jwt.sign({
        id, name, email, sessionId
    }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND
    })
}

export const generateRefreshToken = (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND
    })
}

export const findSessionById = async (sessionId) => {
    const [session] = await db.select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, sessionId));
    return session;
}

export const findUserById = async (userId) => {
    const [session] = await db.select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));
    return session;
}

export const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
};

export const refreshTokens = async (refreshToken) => {
    try {
        const decodedToken = verifyJWTToken(refreshToken);
        const currentSession = await findSessionById(decodedToken.sessionId);
        if (!currentSession || !currentSession.valid) {
            throw new Error("Invalid session")
        }
        const user = await findUserById(currentSession.userId)
        if (!user) {
            throw new Error("User not found")
        }
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            sessionId: currentSession.id
        }
        const newAccessToken = generateAccessToken(userData);
        const newRefreshToken = generateRefreshToken(currentSession.id);
        return { newAccessToken, newRefreshToken, userData }
    } catch (error) {
        console.log(error)
    }
}

export const getLinkById = async (id) => {
    const [link] = await db.select().from(shortLinksTable).where(eq(shortLinksTable.id, id));
    return link;
}

export const getAllShortLinksByUserId = async (id) => {
    const links = await db.select().from(shortLinksTable).where(eq(shortLinksTable.userId, id));
    return links;
}

export const updateLink = async (id, url, shortCode) => {
    await db.update(shortLinksTable).set({ url, shortCode }).where(eq(shortLinksTable.id, id))
};

export const clearUserSession = async (sessionId) => {
    return db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId))
};

export const autenticateUser = async ({ req, res, user }) => {
    const { name, email } = user;
    const [session] = await createSession(user.id, {
        ip: req.clientIp,
        userAgent: req.headers['user-agent']
    });
    const accessToken = generateAccessToken({
        id: user.id,
        name: name,
        email: email,
        sessionId: session.id
    });
    const refreshToken = generateRefreshToken(session.id);
    const baseConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }
    res.cookie('access_token', accessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY
    });
    res.cookie('refresh_token', refreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY
    });
}