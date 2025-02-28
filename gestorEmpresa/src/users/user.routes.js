

import  Router  from "express"
import { 
    login
} from "./user.controller.js"

const api = Router()

api.post('/login', login)

export default api