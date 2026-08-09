const Product=require('../models/product.model')
const Category=require('../models/category.model')
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }
        if (req.files?.length) {

            const uploadedImages = [];

            for (const file of req.files) {

                const result = await uploadToCloudinary(file.buffer);

                uploadedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });

            }

            req.body.images = uploadedImages;
        }
        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json({
            status: "success",
            data: newProduct
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });

    }
};
const getProducts=async (req,res)=>{
    try{
        const { query } = req;
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (query.category) {
            filter.category = query.category;
        }
        const products = await Product.find(filter, { __v: 0 })
            .populate("category", "name")
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            status: "success",
            results: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

const getProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.productId).populate("category", "name");
        if(!product){
            return res.status(404).json({
                status:"fail",
                message:"Product not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: product
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

const updateProduct=async(req,res)=>{
    try{
        const oldProduct= await Product.findById(req.params.productId);
        if(!oldProduct){
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }
        if(req.body.category){
            const category=await Category.findById(req.body.category)
            if (!category) {
                return res.status(404).json({
                    status: "fail",
                    message: "Category not found"
                });
            }
        }
        const product = await Product.findByIdAndUpdate(req.params.productId,req.body,{returnDocument: "after",runValidators: true})
        if(!product){
            return res.status(404).json({
                status:"fail",
                message: "Product not found"
            })
        }
        res.status(200).json({
                    status:"success",
                    data:product
                });
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
};

const addProductImages = async (req, res) => {
    try {

        // 1- نتأكد إن المنتج موجود
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }

        // 2- نتأكد إن فيه صور اترفعت
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Please upload at least one image"
            });
        }

        // 3- هنرفع الصور على Cloudinary
        const uploadedImages = [];

        for (const file of req.files) {

            const result = await uploadToCloudinary(file.buffer);

            uploadedImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });

        }

        // 4- نضيف الصور الجديدة على الصور القديمة
        product.images.push(...uploadedImages);

        // 5- نحفظ المنتج
        await product.save();

        // 6- نرجع النتيجة
        res.status(200).json({
            status: "success",
            data: product
        });

    } catch (err) {

        res.status(500).json({
            status: "error",
            message: err.message
        });

    }
};
const deleteProductImage = async (req, res) => {
    try {
        const { productId } = req.params;
        const { public_id } = req.body;
        // نتأكد إن المنتج موجود
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }

        // حذف الصورة من Cloudinary
        await cloudinary.uploader.destroy(public_id);

        // حذف الصورة من Array
        product.images = product.images.filter(
            (image) => image.public_id !== public_id
        );

        // حفظ التعديل
        await product.save();

        res.status(200).json({
            status: "success",
            data: product
        });

    } catch (err) {

        res.status(500).json({
            status: "error",
            message: err.message
        });

    }
};
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }


        for (const image of product.images) {
            console.log("Deleting:", image.public_id);
            const result = await cloudinary.uploader.destroy(image.public_id);
        }
        await Product.findByIdAndDelete(req.params.productId);

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    addProductImages,
    deleteProductImage,
    deleteProduct
};