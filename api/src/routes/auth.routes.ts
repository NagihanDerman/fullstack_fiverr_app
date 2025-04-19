import express,{Router} from "express";
import { register,login, logout, profile } from "../controllers/auth.controller.ts";
import upload from "../utils/multer.ts";
import protect from "../middleware/protect.ts";

//1 router olusturma
const router: Router = express.Router()

//2 yollari belirleme
router.route("/register").post(upload.single("photo"), register);
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/profile").get(protect, profile);

//3 router i app e tanitmak icin export etmek
export default router;