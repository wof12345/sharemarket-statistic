import express from "express";
import { getAllUserData } from "../controllers/indexController.js";
import { insertdata } from "../controllers/indexController.js";
import { getSpecificData } from "../controllers/indexController.js";
import { updateSpecData } from "../controllers/indexController.js";
import { deleteSpecData } from "../controllers/indexController.js";
import { createNewUserDB } from "../controllers/indexController.js";
import { insertdataSpecDB } from "../controllers/indexController.js";
import { getSpecDBDataFull } from "../controllers/indexController.js";
import { updateSpecDBData } from "../controllers/indexController.js";

const indexRouter = express.Router();

// indexRouter.route("/").get(generateBackendUI);

indexRouter
  .route("/data")
  .get(getAllUserData)
  .post(insertdata)
  .patch(updateSpecData)
  .delete(deleteSpecData);

indexRouter.route("/specData").post(getSpecificData);

indexRouter.route("/createDB").post(createNewUserDB);

indexRouter.route("/insertdataSpecDB").post(insertdataSpecDB);

indexRouter.route("/getSpecDBDataFull").post(getSpecDBDataFull);

indexRouter.route("/updateSpecDBData").patch(updateSpecDBData);

export default indexRouter;
