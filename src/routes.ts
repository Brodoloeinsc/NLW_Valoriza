//Imports
import express, { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

//Consts
const router = Router();
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

//Definições para os arquivos e outras settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'views'))

//Create
const createUserController = new CreateUserController()
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
//Lists
const listUserSenderComplimentController = new ListUserSenderComplimentsController();
const listUserReceiveComplimentController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

//Routers
//Posts
router.post("/users", createUserController.handle); 
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/compliment", ensureAuthenticated,  createComplimentController.handle)
//Gets
router.get("/users/compliments/send", ensureAuthenticated, listUserSenderComplimentController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handle)
router.get('/users', ensureAuthenticated, listUsersController.handle)
router.get('/', (req, res) => {
    res.render("index.ejs")
})

//Export
export { router }