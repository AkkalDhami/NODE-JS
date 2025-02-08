// export const PORT = isNaN(process.env.PORT) ? 3000 : parseInt(process.env.PORT);
import { z } from "zod";

const VALID_PORT = z.number().min(1).max(6000).default(3000);

export const PORT = VALID_PORT.parse(process.env.PORT);
