import { Schema,model } from "mongoose";

const companySchema = Schema(
    {
        name:{
            type:String,
            required:[true,'name is requried'],
            maxLength:[25,'can not be overcome 25 characters']
        },
        impactLevel:{
            type:String,
            required:[true,'Impact Level is required'],
            
        },
        yearsOfExperience:{
            type:Number,
            required:[true,'years of experience is required']
        },
       
        category:{
           type:String,
           required:true
        }

    },
    {
        versionKey: false,
        timestamps: true 
    }
)

export default model('Company',companySchema)