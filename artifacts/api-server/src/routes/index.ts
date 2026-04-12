import { Router, type IRouter } from "express";
import healthRouter from "./health";
import menuRouter from "./menu";
import dailyMenuRouter from "./dailyMenu";
import socialPostsRouter from "./socialPosts";
import galleryRouter from "./gallery";
import eventsRouter from "./events";
import siteSettingsRouter from "./siteSettings";
import socialBufferRouter from "./socialBuffer";
import authRouter from "./auth";
import reservationsRouter from "./reservations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(menuRouter);
router.use(dailyMenuRouter);
router.use(socialPostsRouter);
router.use(galleryRouter);
router.use(eventsRouter);
router.use(siteSettingsRouter);
router.use(socialBufferRouter);
router.use(reservationsRouter);

export default router;
