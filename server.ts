import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import bodyParser from "body-parser";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

// connect to the database

const connectionString = `mongodb+srv://admin:'+ process.env.DB_PASSWORD +'@cluster0.m8jeh.mongodb.net/tuiter?retryWrites=true&w=majority`;
//mongoose.connect(connectionString);
mongoose.connect('mongodb+srv://chenkx98:GoodLuck2021!!!@cluster0.zy7qk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// create RESTful Web service API
const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);