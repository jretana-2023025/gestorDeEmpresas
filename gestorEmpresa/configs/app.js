'use strict'

import express from "express"
import morgan  from "morgan"
import helmet from "helmet"
import cors from 'cors'
import adminRoutes from '../src/users/user.controller.js'
import userRoutes from '../src/users/user.routes.js'
import categoryRoutes from '../src/categories/category.routes.js'
import { limiter } from "../middlewares/rate.limit.js"

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/v1/category',categoryRoutes)
    app.use('/v1/user',userRoutes)

}


export const initServer =async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        await adminRoutes()
        app.listen(process.env.PORT)
        console.log(`server running in port ${process.env.PORT}`)
    } catch (error) {
        console.log('server init faild',error)
    }
}