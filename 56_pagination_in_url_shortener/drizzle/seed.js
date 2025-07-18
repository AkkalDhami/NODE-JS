import { reset, seed } from "drizzle-seed";
import * as schemas from "./schema.js";
import { db } from "../config/db.js";

// await reset(db, schemas);

const USER_ID = 1;
await reset(db, { shortLinksTable: schemas.shortLinksTable });
await seed(
    db,
    { shortLinksTable: schemas.shortLinksTable },
    { count: 100 }
).refine((f) => ({
    shortLinksTable: {
        columns: {
            userId: f.default({ defaultValue: USER_ID }),
            url: f.default({ defaultValue: "https://akkal.vercel.app/" }),
        },
    },
}));

process.exit(0);