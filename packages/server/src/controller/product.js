const { Product, Product_categories, Product_description, Product_img, Product_stock, Product_unit, Categories, } = require('../library/sequelize')
const productController = {
    getAllProduct: async (req, res) => {
        try {
            const allProduct = await Product.findAll({
                limit: 20,
                offset: 0,
                include: [
                    Product_description, 
                    
                    Product_img, 

                    {
                        model : Product_stock,
                        include: [{model: Product_unit}]
                    },
                    
                    {
                        model: Product_categories,
                        include: [{model: Categories}]
                    }
                ],
                order: [['createdAt', 'DESC']]
            })

            return res.status(200).json({
                message: "All product has fetched",
                result: allProduct
            })

        } catch (error) {
            console.log(error);
        }
    },

    getProductById: async (req, res) =>{
        try{
            const { product_id } = req.params

            const findProduct = await Product.findOne(
                {
                    where: {
                        id : product_id,
                    },

                    include: [
                        Product_description, 
                        
                        Product_img, 
    
                        {
                            model : Product_stock,
                            include: [{model: Product_unit}]
                        },
                        
                        {
                            model: Product_categories,
                            include: [{model: Categories}]
                        }
                    ],
                }
            )

            return res.status(200).json({
                message: `fatched the post from post_id = ${product_id}`,
                result: findProduct
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.toString()
            })
        }
    },

    getProdutByCategories: async (req, res) => {
        try {
            const { categories_id } = req.query

            const findProductInCategories = await Product_categories.findAll(
                {   
                    where: {
                        categories_id, 
                    },
                }
            )

            console.log(findProductInCategories)

            const findAllProduct = await Product.findAll({
                where: {
                    id: findProductInCategories[0].dataValues.product_id,
                },
                include: [
                    Product_description, 
                    
                    Product_img, 

                    {
                        model : Product_stock,
                        include: [{model: Product_unit}]
                    },
                    
                    {
                        model: Product_categories,
                        include: [{model: Categories}]
                    }
                ],
            })

            res.status(200).json({
                message: 'product has been fetched by categories',
                result: findAllProduct
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'error',
            })
        }
    }
}

module.exports = productController