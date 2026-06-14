const express = require("express");
const requestController = require("../controllers/requestController");
const authController = require("../controllers/authController");

const router = express.Router();

// أي Route بعد السطر ده لازم المستخدم يكون عامل Login
router.use(authController.protect);
router.get('/:requestId/nearby-craftsmen', requestController.findNearbyCraftsmen);
router.post("/", requestController.createRequest);
router.get("/:id", requestController.getRequest);

module.exports = router;