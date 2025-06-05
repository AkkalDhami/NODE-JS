import { z } from 'zod';

export const env = z.object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URL: z.string(),
    MONGODB_DB_NAME: z.string(),
});
