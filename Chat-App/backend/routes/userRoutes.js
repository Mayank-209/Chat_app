import express from "express";
import { authenticate, getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../MiddleWare/isAuthenticated.js";

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);
router.route("/auth").post(isAuthenticated,authenticate);
export default router;