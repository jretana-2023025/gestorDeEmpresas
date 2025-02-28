'use strict'
import { limiter } from '../../middlewares/rate.limit.js'
import Category from './category.model.js'

export const saveCategory = async (req,res) => {
    try {
        const data = await req.body
        const category = new Category(data)
        await category.save()
        category.populate()
        return res.send(
            {
                success: true,
                message:`Category saved succesfully ${category.name}`
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'general error with addCategory',
                error
            }
        )
    }

    
}

export const getAllCategories = async (req,res) => {
    try {
        const {limit, skip} = req.query
        const category = await Category.find()
        .skip(skip).limit(limit)

        if(category.length===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Category not found'
                }
            )
        }

        return res.send(
            {
                success:true,
                message:'Categories found',
                category
            }
        )



    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message:'general error with getAllCategories'
            }
        )
    }
}