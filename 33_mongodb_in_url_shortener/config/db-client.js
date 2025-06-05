import { MongoClient } from "mongodb";
import { env } from "./env.js";
export const dbClient = new MongoClient('mongodb://127.0.0.1:27017');
