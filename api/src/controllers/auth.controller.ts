import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken"
import error from "../utils/error.ts";
import catchAsync from "../utils/catchAsync.ts";


//------------kaydolma /yeni hesap olusturma-----
export const register = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  //sifreyi saltla ve hash le
  const hashedPass: string  = bcrypt.hashSync(req.body.password, 12);

  //kullaniciyi veritabanina kaydet
  const newUser = await User.create({ ...req.body, password: hashedPass });

  //password'u cliente gonderme
  const { password, ...userWithoutPass } = newUser;


  //client e cevap gonder
  res.status(200).json({ message: "hesabiniz olusturuldu", data: newUser });
});

//------------giris yap /mevcut hesab ile -----
export const login = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

//isme gore kullanici yi ara
const user: IUser | null= await User.findOne({username: req.body.username})

//kullanici bulunamazsa hata gonder
if (!user) return next(error(404, "Girdiğiniz bilgiler yanlış"));

//veritabanindaki hashlenmis sifre ile istegin bodysinde gelen sifre aynimi koktrol et
const isCorrect = bcrypt.compareSync(req.body.password, user.password );


//sifreler ayni degilse  hata gonder 
if (!isCorrect) return next(error(404, "Girdiğiniz bilgiler yanlış"));


//sifre dogruyse jwt token gonder
const token =jwt.sign({id:user._id,isSeller:user.isSeller}, process.env.JWT_KEY as string, {expiresIn:process.env.JWT_DURATION as string})


// sifre alanini kaldir  
const { password, ...userWithoutPass } = user;

//token i clienta gonder
res
.cookie("token", token,{httpOnly: true, sameSite: "none", expires: new Date(Date.now() + 14 * 24 * 3600 * 1000)})
.status(200)
.json({ message: "hesaba giris yapildi", token, user:userWithoutPass });


});

//------------cikis yap / oturumu kapat -----
export const logout = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.clearCookie("token").status(200).json({ message: "hesaptan basariyla cikildi" });
});
