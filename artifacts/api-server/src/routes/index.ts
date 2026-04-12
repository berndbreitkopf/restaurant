import { Router, type IRouter } from "express";
import healthRouter from "./health";
import menuRouter from "./menu";
import dailyMenuRouter from "./dailyMenu";
import socialPostsRouter from "./socialPosts";
import galleryRouter from "./gallery";
import eventsRouter from "./events";

const router: IRouter = Router();

router.use(healthRouter);
router.use(menuRouter);
router.use(dailyMenuRouter);
router.use(socialPostsRouter);
router.use(galleryRouter);
router.use(eventsRouter);

export default router;
