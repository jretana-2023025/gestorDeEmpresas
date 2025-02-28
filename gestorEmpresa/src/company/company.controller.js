'use strict'

import Company from './company.model.js'

export const SaveCompany = async (req,res) => {
    try {
        const data = await req.body
        const company = new Company(data)
        await company.save()

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
        const {limit,skip}=req.queryt
        let {companyId}=req.params
        const company = await Company.find({company: companyId})
        .limit(limit)
        .skip(skip)
        .sort(
            name:1
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