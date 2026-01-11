import express from "express";
import {
  createForm,
  getMyForms,
  getFormById,
  getTemplates
} from "../controllers/form.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createForm);
router.get("/", authMiddleware, getMyForms);
router.get("/:id", authMiddleware, getFormById);
router.get("/templates", getTemplates);

export default router;
