'use strict'

import { header } from 'express-validator'
import Company from './company.model.js'
import ExcelJS from 'exceljs'

const ExcelFile = async () => {
    try {
        const companys = await Company.find()
        const workBook = new ExcelJS.Workbook()
        const workSheet = workBook.addWorksheet('Companys')
        
        workSheet.columns=[
            {header: 'Name',key:'name', with:30},
            {header: 'impactLevel',key:'impactLevel',width:20},
            {header: 'yearsOfExperience',key:'yearsOfExperience',with:20},
            {header: 'category',key:'category',with:20}

        ]

        companys.forEach(company =>{
            workSheet.addRow({
                name:company.name,
                impactLevel: company.impactLevel,
                yearsOfExperience: company.yearsOfExperience,
                category: company.category
            })
        })

        await workBook.xlsx.writeFile('companys.xlsx')
        console.log('Excel file updated successfully')
        

    } catch (error) {
        console.error('Error meaking a excelFile',error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
}


export const SaveCompany = async (req,res) => {
    try {
        const data = await req.body
        const company = new Company(data)
        await company.save()

        await ExcelFile()

        
        return res.send(
            {
                success:true,
                message:`Company saved succesfully ${company.name}`
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
    
}





export const getAllcompanies = async (req,res) => {
    try {
        const {limit,skip}=req.query
        const company = await Company.find()
        .limit(limit)
        .skip(skip)
       

        if(company.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Companies not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Companies found',
                total:company.length,
                company
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
}


//listar de la A-Z


export const getAllcompaniesAZ = async (req,res) => {
    try {
        const {limit,skip}=req.query
        let {companyId}=req.params
        const company = await Company.find({company: companyId})
        .limit(limit)
        .skip(skip)
        .sort(
            {
                name:1
            }
           
        )
       

        if(company.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Companies not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Companies found',
                total:company.length,
                company
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
}


//listar Z-A
export const getAllcompaniesZA = async (req,res) => {
    try {
        const {limit,skip}=req.query
        let {companyId}=req.params
        const company = await Company.find({company: companyId})
        .limit(limit)
        .skip(skip)
        .sort(
            {
                name:-1
            }
           
        )
       

        if(company.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Companies not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Companies found',
                total:company.length,
                company
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
}


//listar por categoria

export const companiesByCategory = async (req,res) => {
    try {
        const {limit,skip}=req.query
        let {categories}=req.params
        const company = await Company.find({category: categories})
        .limit(limit)
        .skip(skip)
       

        if(company.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Companies not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Companies found',
                total:company.length,
                company
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
}

// years of experience
export const GetAllYearsOE = async (req,res) => {
    try {
        const {limit,skip}=req.query
        let {id}=req.params
        const company = await Company.find({yearsOfExperience: Number(id)})
        .limit(limit)
        .skip(skip)
        
       

        if(company.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Companies not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Companies found',
                total:company.length,
                company
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
}

export const updatedCompany = async (req,res) => {
    try {
        const {id} = req.params
        let data = req.body
        let updateCompany = await Company.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!updateCompany){
            return res.status(404).send(
                {
                    success:false,
                    message:'Company not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Company updated successfully'
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'General error with saveCompany'
            }
        )
    }
    
}

