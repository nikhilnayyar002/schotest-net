import * as express from "express";
import {
  getTest,
  postTest,
  getQuestionsAnswers,
  updateTest,
  getTestsByCategory,
  getTests,
  getTestsCount,
  delTest,
  findTests,
  getTestsByCategoryCount
} from "../controllers/test.controller";
import { checkAdminRoute } from "../config/global";

let router: express.Router = express.Router();
router.post("/", checkAdminRoute, postTest); /** an admin route */
router.put("/", checkAdminRoute, updateTest); /** an admin route */
router.post("/find", findTests);
router.get("/count", getTestsCount);
router.get("/category/:catID/count", getTestsByCategoryCount);
router.get("/category/:catID/:pNo", getTestsByCategory);
router.get("/all/:pNo", getTests);
router.get("/:testID", getTest);
router.get("/:testID/completed", getQuestionsAnswers);
router.delete("/:tID", checkAdminRoute, delTest); /** an admin route */

export const TestRouter = router;
