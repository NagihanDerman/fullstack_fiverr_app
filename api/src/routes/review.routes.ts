import express, { Router } from "express";

//1 router olusturma
const router: Router = express.Router();

//2 yollari belirleme
router.route("/").get();
router.route("/:id").get();

//3 router i app e tanitmak icin export etmek
export default router;
