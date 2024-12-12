import express,{Router} from "express";

import { register,login, logout } from "../controllers/auth.controller.js";

//1 router olusturma
const router: Router = express.Router()

//2 yollari belirleme
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)

//3 router i app e tanitmak icin export etmek
export default router;