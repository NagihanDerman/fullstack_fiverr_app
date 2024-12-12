import {model, Schema} from "mongoose"

// bir belgenin tipi
export interface IReview{
    name:string;
}
//sema olustur
const reviewSchema =new Schema<IReview>({
    name : {
        type : String,
    }
})
// model olustur
const Review = model<IReview>("Review", reviewSchema)

 export default Review;