import express from "express";

import {getAllEmployee,getEmployee,deleteEmployee,updateEmployee,createEmployee} from "../controllers/employeeControllers.js";

const router = express.Router();

router.post("/",createEmployee);
router.get("/",getAllEmployee);
router.get("/:id",getEmployee);
router.delete("/:id",deleteEmployee);
router.put("/:id",updateEmployee);

export default router;