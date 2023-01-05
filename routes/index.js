const { Router } = require("express");
const heroRouter = require("./heroRouter");
const powerRouter = require('./powerRoutes')
const imageRouter = require("./imageRouter");

const router = Router();

router.use('/heroes', heroRouter);
router.use('/powers', powerRouter);
router.use('/', imageRouter);

module.exports = router;
