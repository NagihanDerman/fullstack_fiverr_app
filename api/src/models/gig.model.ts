import {model, Schema} from "mongoose"


// bir belgenin tipi
export interface IGig{
    name:string;
}
//sema olustur
const gigSchema =new Schema<IGig>({
    name : {
        type : String,
    }
})
// model olustur
const Gig = model<IGig>("Gig", gigSchema)

 export default Gig;