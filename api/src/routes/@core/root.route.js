/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Root Route class
| Dependencies  :
|   > express (app)
|   > express (Router)
|   > ./../../common/config/api{...}
|   > ./../../middleware/logging/logger/onHttpRequestCompleted(...) as httpLogger
|   > ./../../common/utils/http.util
|   > ./../../controllers/heartbeat.controller
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
module.exports = function RootRoute(router, config, logger) {
  const { setRoute } = require("./../../common/utils/http.util")();
  const heartbeatController =
    require("./../../controllers/heartbeat.controller")(config, logger);

  // ping
  router.get(setRoute(`ping`), heartbeatController.ping);
};
