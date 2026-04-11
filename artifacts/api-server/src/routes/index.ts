import { Router, type IRouter } from "express";
import healthRouter from "./health";
import menuRouter from "./menu";
import dailyMenuRouter from "./dailyMenu";
import socialPostsRouter from "./socialPosts";
import galleryRouter from "./gallery";

const router: IRouter = Router();

router.use(healthRouter);
router.use(menuRouter);
router.use(dailyMenuRouter);
router.use(socialPostsRouter);
router.use(galleryRouter);

export default router;
