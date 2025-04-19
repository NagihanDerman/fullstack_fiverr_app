import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import reviewRouter from "./routes/review.routes.ts";
import gigRouter from "./routes/gig.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import errorMiddleware from "./middleware/errorHandler.ts";
import cors from "cors"
import cookieParser from "cookie-parser";

// env dosyasindaki degiskenlere erisir
dotenv.config();


//veritabani ile baglanti kur
mongoose.connect(process.env.DATABASE_URL as string)
.then(()=>console.log("🥎🥎 veritabaninan baglandi"))
.catch((err)=>console.log("🧨🧨 veritabanina baglanmadi"))

// express uygulamasini baslatir
const app = express();



// middleware'ler
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin : "http://localhost5173",
    methods : ["GET","POST", "PATCH", "DELETE", "PUT"],
    credentials : true,
})) //cors hatalarini onleyen mw


// route'lar
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);


// hata yönetimi için mw
app.use(errorMiddleware);


// portu dinlemeye başla
app.listen(process.env.PORT , ()=>{
    console.log(`💥✨ server ${process.env.PORT}. port dinlenmeye basladi` )
})



