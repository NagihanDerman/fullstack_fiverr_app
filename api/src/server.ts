import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import reviewRouter from "./routes/review.routes.ts";
import gigRouter from "./routes/gig.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import errorMiddleware from "./middleware/errorHandler.ts";


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

app.use(express.json())

