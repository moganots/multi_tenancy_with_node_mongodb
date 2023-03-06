/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Admin Route class
| Dependencies  :
|   > express (app)
|   > express (Router)
|   > ./../../common/config/api{...}
|   > ./../../middleware/logging/logger/onHttpRequestCompleted(...) as httpLogger
|   > ./../../common/utils/http.util
|   > ./../../controllers/heartbeat.controller
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
module.exports = function AdminRoute(router, config, logger) {
  const apiAnchorName = `admin`;
  const { setRoute } = require("./../../common/utils/http.util")();
  const heartbeatController =
    require("./../../controllers/heartbeat.controller")(config, logger);

  // ping
  router.route(setRoute(apiAnchorName, `ping`)).get(heartbeatController.ping);
};
