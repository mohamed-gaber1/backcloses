const Category=require('../models/category.model')
const Product = require('../models/product.model');
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "categories"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer);
    });
};

const createCategory = async (req, res) => {
    try {
        const data = {
            name: req.body.name
        };
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);


        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);

            data.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        const newCategory = new Category(data);

        await newCategory.save();

        res.status(201).json({
            status: "success",
            data: newCategory
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
const getCategories = async (req,res)=>{
    try{
        const query=req.query;
        const page=Number(query.page)||1;
        const limit=Number(query.limit)||10;
        const skip=(page-1)*limit;
        const categories =await Category.find({},{'__v':0}).limit(limit).skip(skip);
        if(categories.length === 0){
            return res.status(200).json({
                status: "success",
                results: 0,
                data: []
            });
        }
        res.status(200).json({
            status:"success",
            results: categories.length,
            data:categories
        })
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }

        if (req.body.name !== undefined) {
            category.name = req.body.name;
        }

        if (req.file) {
        
            const result = await uploadToCloudinary(req.file.buffer);
        
            // Delete old image
            if (category.image && category.image.publicId) {
                await cloudinary.uploader.destroy(category.image.publicId);
            }
        
            // Save new image
            category.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }
        await category.save();

        res.status(200).json({
            status: "success",
            data: category
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }

        const product = await Product.findOne({
            category: req.params.categoryId
        });

        if (product) {
            return res.status(409).json({
                status: "fail",
                message: "Cannot delete category because it contains products"
            });
        }

        // Delete image from Cloudinary
        if (category.image && category.image.publicId) {
            await cloudinary.uploader.destroy(category.image.publicId);
        }

        // Delete category from MongoDB
        await Category.findByIdAndDelete(req.params.categoryId);

        res.status(200).json({
            status: "success",
            message: "Category deleted successfully",
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};