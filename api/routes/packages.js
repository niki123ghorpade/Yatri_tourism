import express from "express";
import {
  countBypackageType,
  createPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
  getAllDestinations,
  getPackageCount,
} from "../controllers/package.js";
import Package from "../models/Package.js"; 
import {verifyAdmin} from "./utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPackage);

//UPDATE
router.put("/:id", verifyAdmin, updatePackage);
//DELETE
router.delete("/:id", verifyAdmin, deletePackage);
//GET

router.get("/find/:id", getPackage);
//GET ALL

router.get("/", getPackages);

router.get("/countBypackageType", countBypackageType);
router.get("/count", getPackageCount);
router.get("/destinations", getAllDestinations);


export default router;