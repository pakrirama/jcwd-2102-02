const {
  Product_History,
  Product_Order,
  Product,
  Product_Stock,
} = require("../models");
const { Op } = require("sequelize");

class HistoryController {
  static async createProductHistory(req, res) {
    const { id_order } = req.params;
    try {
      const orderData = await Product_Order.findAll({
        where: {
          id_order,
        },
        include: {
          model: Product,
          attributes: ["id", "name"],
          include: {
            model: Product_Stock,
            attributes: ["id", "primary_stock", "primary_unit"],
          },
        },
      });

      const arrOrder = [];
      for (let i = 0; i < orderData.length; i++) {
        let temp = {};
        temp.product = orderData[i].dataValues.Product.dataValues.name;
        temp.unit = orderData[i].dataValues.type;
        temp.quantity = orderData[i].dataValues.quantity;
        temp.type = "Penjualan";
        temp.status = "Penngurangan";
        arrOrder.push(temp);
      }

      await Product_History.bulkCreate(arrOrder, { returning: true });

      return res.status(200).json({
        message: "Product History Created",
        result: orderData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllhistory(req, res) {
    const {
      filter,
      status,
      no_invoice,
      order,
      orderby,
      datefrom,
      dateto,
      limit,
    } = req.query;
    let offset = req.query.offset ? req.query.offset : 0;
    offset = parseInt(offset);
    const page = 1;
    let product_histories;
    try {
      product_histories = await Product_History.findAll({
        where: {
          product: {
            [Op.substring]: [filter],
          },
          [Op.and]: [
            no_invoice ? { no_invoice } : {},
            datefrom && dateto
              ? {
                  [Op.or]: [
                    {
                      createdAt: {
                        [Op.between]: [datefrom, dateto],
                      },
                    },
                  ],
                }
              : {},
            status ? { status } : {},
          ],
        },
        order: order && orderby ? [[order, orderby]] : [],
        limit: limit ? parseInt(limit) : undefined,
        offset,
        page,
      });
      res.status(200).json({
        status: "success",
        result: { product_histories, page, offset },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async gethistoryById(req, res) {
    try {
      const { id } = req.params;

      const findhistory = await Product_History.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get history",
        result: findhistory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteHistory(req, res) {
    try {
      await Product_History.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ status: "success", data: "deleted" });
    } catch (error) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

module.exports = HistoryController;
