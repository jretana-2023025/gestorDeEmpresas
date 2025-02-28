import { Schema, model } from "mongoose";

const categorySchema =Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            trim:true
        },
        description:{
            type:String,
            trim:true,
            required:[true,'Description is required'],
            maxLength:[200,`Can not ve overcome 200 characters`]
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
    
    
)

export default model('category',categorySchema)