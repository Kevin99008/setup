import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import { logger, errorHandler } from './middleware/error.middleware.js';
import Router from "koa-router";
import Facade from './config/index.js';
import userRouter from "./routers/users.routers.js";



const app = new Koa();
const port = 8000;

const router = new Router();

const facade = new Facade();


app.use(logger);
app.use(errorHandler);

// db connection
facade._connectDB();

app.use(parser())
app.use(cors());


//router
// router.get("/Users_list", getUsers);
// router.post("/add_User", createUser);
router.use(userRouter.routes(),userRouter.allowedMethods())
router.get("/events_list", (ctx) => (ctx.body = "Events List!"));


app.use(router.routes());



// start the server
app.listen(port, ()=>{
    console.log(`server run on port ${port} ...`)
});

