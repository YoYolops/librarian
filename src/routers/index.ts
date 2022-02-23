import { Router } from "express";
import clientRouter from "./client";
import adminRouter from "./admin";

const router = Router();

router.use("/client", clientRouter);
router.use("/admin", adminRouter)

export default router;