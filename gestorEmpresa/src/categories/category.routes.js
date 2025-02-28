import { Router } from "express";
import { saveCategory,getAllCategories } from "./category.controller.js";

const api = Router()

api.post('/saveCategory',saveCategory)
api.get('/getCategories',getAllCategories)

export default api