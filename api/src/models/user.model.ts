import {model, Schema} from "mongoose"

// bir belgenin tipi
export interface IUser{
  _id: string;
    username:string;
    email:string;
    password:string;
    photo:string;
    country:string;
    isSeller:boolean;
    phone?:string;
    desc?:string;
    createdAt: Date;
  updatedAt: Date;
}
//sema olustur
const userSchema =new Schema<IUser>({
   username:{
    type: String,
    unique:true, 
    required:[true, "lutfen username alanini belirleyin "]
   },
   email:{
    type: String,
    unique:true,
    required:[true, "lutfen email alanini belirleyin "]
   },
   password:{
    type: String,
   required:[true, "lutfen password alanini belirleyin "]
   }
   ,
   country:{
    type: String,
   required:[true, "lutfen country alanini belirleyin "]
   },
   photo:{
    type: String,
   default:"https://picsum.photos/200"
   },
   isSeller:{
    type: Boolean,
   default: false,
   }, 

   phone:{
    type: String,
   },

   desc:{
    type: String,
   
   }
   },
   {
    timestamps: true,
  }
)

// model olustur
const User = model<IUser>("User", userSchema)

 export default User;