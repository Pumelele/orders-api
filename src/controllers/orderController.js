const Order = require("../models/order");
const { mapOrderPayload } = require("../utils/mapOrder");

// POST /order
async function createOrder(req, res, next) {
  try {
    const orderData = mapOrderPayload(req.body);

    if (!orderData.orderId) {
      return res.status(400).json({ message: "Invalid orderId" });
    };
    if(!Number.isFinite(orderData.value) || orderData.value < 0){
      return res.status(400).json({ message: "Invalid value" });
    }
    if (isNaN(orderData.creationDate.getTime())) {
      return res.status(400).json({ message: "Invalid creationDate" });
    }
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  }
catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Order with this orderId already exists" });
    }
    return next(err);
  }
}
//GET /order/:orderId
async function getOrder(req, res, next) {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId }).lean();
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
}

//Get /order/list function

async function listOrders(req, res, next) {
  try {
    const orders = await Order.find().lean();
    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
}

module.exports = { createOrder, getOrder, listOrders

    
 };