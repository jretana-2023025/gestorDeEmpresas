import { Router } from "express";
import {companyValidator} from '../../middlewares/validators.js'
import {validateJwt, isAdmin} from '../../middlewares/validate.jwt.js'
import { SaveCompany, 
    getAllcompanies,
    getAllcompaniesAZ,
    getAllcompaniesZA,
    companiesByCategory,
    GetAllYearsOE,
    updatedCompany } from "./company.controller.js";
const api = Router()

api.post('/SaveCompany',SaveCompany)
api.get('/getAll',validateJwt,isAdmin,getAllcompanies)
api.get('/getAZ',validateJwt,isAdmin,getAllcompaniesAZ)
api.get('/getZA',validateJwt,isAdmin,getAllcompaniesZA)
api.get('/ByCategory/:categories',validateJwt,isAdmin,companiesByCategory)
api.get('/yearsOE/:id',validateJwt,isAdmin,GetAllYearsOE)
api.put('/updateCompany/:id',validateJwt,isAdmin,updatedCompany)

export default api
