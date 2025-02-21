// Core Module
import path from 'path'

// External Module
import express from 'express'

//Local Module
import { userRouter } from './routes/userRouter.js'
import { hostRouter } from './routes/hostRouter.js'
import { rootDir } from './utils/pathUtils.js'
import { contactRouter } from './routes/contactRouter.js'

const app = express();
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);
app.use(contactRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));

})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});