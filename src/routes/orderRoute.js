const router = require("express").Router();
const { createOrder, getOrder } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/:orderId", getOrder);
module.exports = router;