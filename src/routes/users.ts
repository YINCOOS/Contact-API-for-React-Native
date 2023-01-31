import express from "express";
import {Login, Register, createContact, getContactsByUser, deleteContact} from "../controller/userController";
import { auth } from "../middleware/authorization";
import { upload } from "../utils/multer";


// import { auth } from "../middleware/authorization";

const router = express.Router();

router.post('/signup', Register)
router.post('/login', Login)
router.post('/create-contact', auth, upload.single('image'), createContact)
router.get('/get-contact', auth, getContactsByUser)
router.delete('/delete-contact/:id', auth, deleteContact)
// auth, 


export default router;
