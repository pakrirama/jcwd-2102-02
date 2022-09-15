const {
  Order,
  User,
  Address,
  Product_Order,
  Product_Cart,
  Product,
  Expedition,
} = require("../models");
const { Op } = require("sequelize");

class OrderController {
  static async addOrder(req, res) {
    const total_payment = req.body.cost + req.body.total_price;
    const estimation_time = req.body.etd;
    const d = new Date();
    const productCart = req.body.Product_Carts;

    try {
      const newOrder = await Order.create({
        ...req.body,
        shipping_cost: req.body.cost,
        total_payment,
      });
      // const newOrder = { ...req.body };
      const no_invoice = `MDCR${newOrder.id_user}-${newOrder.id}${d.getTime()}`;
      await newOrder.update({ no_invoice });
      await Expedition.create({
        ...req.body,
        id: newOrder.id,
        estimation_time,
      });

      const orderProductData = [];
      const pcId = [];
      for (let i = 0; i < productCart.length; i++) {
        let temp = {};
        temp.id_order = newOrder.id;
        temp.id = 0;
        temp.id_product = productCart[i].Product.id;
        temp.quantity = productCart[i].quantity;
        pcId.push(productCart[i].id);
        orderProductData.push(temp);
      }

      const newOrderProduct = await Product_Order.bulkCreate(orderProductData, {
        returning: true,
      });

      // await Product_Cart.destroy({ where: { id: pcId } });

      return res.status(200).json({
        message: "new order has been created",
        result: newOrder,
        po: newOrderProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllOrder(req, res) {
    try {
      let findOrders = await Order.findAll();
      res.status(200).json({ status: "success", result: findOrders });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getOrderById(req, res) {
    const { id } = req.params;
    try {
      let order = await Order.findAll({
        include: [
          {
            model: Address,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: User,
            attributes: ["full_name", "phone"],
          },
          {
            model: Product_Order,
            attributes: ["id", "quantity"],
            include: { model: Product, attributes: ["id", "name", "price"] },
          },
          {
            model: Expedition,
            attributes: [
              "cost",
              "courier",
              "service",
              "estimation_time",
              "description",
            ],
          },
        ],
        where: {
          [Op.or]: [{ id }, { id_user: id }],
        },
      });
      return res.status(200).json({
        message: "Get Order by User",
        result: order,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteOrder(req, res) {
    await Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = OrderController;
