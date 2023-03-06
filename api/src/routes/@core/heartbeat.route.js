/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Heartbeat Route class
| Dependencies  :
|   > express (app)
|   > express (Router)
|   > ./../../common/config/api{...}
|   > ./../../middleware/logging/logger/onHttpRequestCompleted(...) as logger
|   > ./../../common/utils/http.util
|   > ./../../controllers/heartbeat.controller
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
module.exports = function HeartbeatRoute(router, config, logger) {
  const apiAnchorName = `heartbeat`;
  const { setRoute } = require("./../../common/utils/http.util")();
  const heartbeatController =
    require("./../../controllers/heartbeat.controller")(config, logger);

  // ping
  router.route(setRoute(apiAnchorName, `ping`)).get(heartbeatController.ping);
};
