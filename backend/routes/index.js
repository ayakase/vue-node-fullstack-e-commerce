const express = require("express");
const auth = require('../middlewares/auth');
const router = express.Router();

const clientAdvisoryRoute = require("../controllers/client/advisoryRoute");
const clientCategoryRoute = require("../controllers/client/categoryRoute");
const clientRegionRoute = require("../controllers/client/regionRoute");
const clientLocationRoute = require("../controllers/client/locationRoute");
const clientHotTourRoute = require("../controllers/client/hotTourRoute");
const clientEachTourRoute = require("../controllers/client/eachTourRoute");
const clientDiscountRoute = require("../controllers/client/discountRoute");
const clientEachPostRoute = require("../controllers/client/eachPostRoute");
const clientOrderRoute = require("../controllers/client/orderRoute");
const clientCarouselRoute = require("../controllers/client/carouselRoute")
const clientSlideRoute = require("../controllers/client/slideRoute")
const clientSearchRoute = require("../controllers/client/searchRoute")
const clientInitialRoute = require("../controllers/client/initialRoute")
const clientPostRoute = require("../controllers/client/postRoute")
//admin
const adminUserRoute = require("../controllers/admin/adminUserRoute")
const adminTourRoute = require("../controllers/admin/tourManageRoute");
const adminHotTourRoute = require("../controllers/admin/hotTourManageRoute");
const adminAdvisoryRoute = require("../controllers/admin/advisoryManageRoute");
const adminOrderRoute = require("../controllers/admin/orderManageRoute");
const adminLibraryRoute = require("../controllers/admin/libraryManageRoute");
const adminPostRoute = require("../controllers/admin/postManageRoute");
const adminSlideRoute = require("../controllers/admin/sliderManageRoute");
const adminCountRoute = require("../controllers/admin/countManageRoute");
const adminEachOrderRoute = require("../controllers/admin/eachOrderRoute");
const adminRegionRoute = require("../controllers/admin/regionManageRoute");
const adminLocationRoute = require("../controllers/admin/locationManageRoute");
const adminNotificationRoute = require("../controllers/admin/notificationManageRoute");
const adminPostInitialRoute = require("../controllers/admin/eachPostInitial")
const adminChartRoute = require("../controllers/admin/chartRoute");
const loginRoute = require("../controllers/admin/loginRoute");

router.use("/client/advisory", clientAdvisoryRoute);
router.use("/client/category", clientCategoryRoute);
router.use("/client/hottour", clientHotTourRoute);
router.use("/client/order", clientOrderRoute);
router.use("/client/each-tour", clientEachTourRoute);
router.use("/client/each-post", clientEachPostRoute);
router.use("/client/carousel", clientCarouselRoute)
router.use("/client/slide", clientSlideRoute)
router.use("/client/search", clientSearchRoute)
router.use("/client/initial", clientInitialRoute)
router.use("/client/region", clientRegionRoute)
router.use("/client/location", clientLocationRoute)
router.use("/client/discount", clientDiscountRoute)
router.use("/client/post", clientPostRoute)
//admin
router.use("/admin/user", auth, adminUserRoute);
router.use("/admin/tour", auth, adminTourRoute);
router.use("/admin/hottour", auth, adminHotTourRoute);
router.use("/admin/advisory", auth, adminAdvisoryRoute);
router.use("/admin/order", auth, adminOrderRoute);
router.use("/admin/library", auth, adminLibraryRoute);
router.use("/admin/post", auth, adminPostRoute);
router.use("/admin/slider", auth, adminSlideRoute);
router.use("/admin/count", auth, adminCountRoute);
router.use("/admin/each-order", auth, adminEachOrderRoute);
router.use("/admin/region", auth, adminRegionRoute);
router.use("/admin/location", auth, adminLocationRoute);
router.use("/admin/notification", auth, adminNotificationRoute);
router.use("/admin/each-post/initial", auth, adminPostInitialRoute);
router.use("/admin/chart", auth, adminChartRoute);
router.use("/admin/login", loginRoute);

module.exports = router;
