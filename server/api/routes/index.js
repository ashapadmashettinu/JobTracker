import userRouter from './user.js';
import jobRouter from './job.js';
import loginRouter from "./login.js";
import locationRouter from './location.js'
import mailRouter from './mail.js';
import fileRouter from './upload.js';
import applicationRouter from './application.js';

export default (app) => {
  app.use("/apis", userRouter);
  app.use("/apis", jobRouter);
  app.use("/apis", loginRouter);
  app.use('/apis', locationRouter);
  app.use("/apis", mailRouter);
  app.use("/apis", fileRouter);
  app.use("/apis",applicationRouter);
};
