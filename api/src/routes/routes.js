/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Routes class
|   > express
|   > express (app)
|   > express (Router)
|   > ./../common/config/api{...}
|   > ./../middleware/logging/logger/onHttpRequestCompleted(...) as logger
|   > express (app)
|   > express (app)
|   > express (app)
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
module.exports = (config, logger) => {
  /*
|------------------------------------------------------------------------------------------------------------------
| Dependency(ies)
|------------------------------------------------------------------------------------------------------------------
 */
  const router = require(`express`).Router();
  const rootRoute = require("./@core/root.route")(router, config, logger);
  const heartbeatRoute = require("./@core/heartbeat.route")(router, config, logger);
  const adminRoute = require("./admin/admin.route")(router, config, logger);
  const tenantRoute = require("./tenant/tenant.route")(router, config, logger);
  return router;
};
