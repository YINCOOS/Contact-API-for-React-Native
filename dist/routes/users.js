"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authorization_1 = require("../middleware/authorization");
const multer_1 = require("../utils/multer");
// import { auth } from "../middleware/authorization";
const router = express_1.default.Router();
router.post('/signup', userController_1.Register);
router.post('/login', userController_1.Login);
router.post('/create-contact', authorization_1.auth, multer_1.upload.single('image'), userController_1.createContact);
router.get('/get-contact', authorization_1.auth, userController_1.getContactsByUser);
router.delete('/delete-contact/:id', authorization_1.auth, userController_1.deleteContact);
// auth, 
exports.default = router;
