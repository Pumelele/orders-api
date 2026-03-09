const router = require("express").Router();
const { createOrder, getOrder, listOrders } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/list", listOrders);
router.get("/:orderId", getOrder);
module.exports = router;