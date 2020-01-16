// code away!
const express = require("express");
const server = express();
const logger = require('./middleware/logger');
const welcomeRouter = require('./routers/welcome');
const userRouter = require("./users/userRouter");
const postRouter = require('./posts/postRouter');

server.use(logger());

server.use(express.json());
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8000;

server.use("/", welcomeRouter);
server.use("/users", userRouter);
server.use("/posts", postRouter);

server.listen(port, () => {
  console.log(`\n*** Server listening on ${host}:${port}`);
});