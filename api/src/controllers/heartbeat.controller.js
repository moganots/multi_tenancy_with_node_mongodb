/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Heartbeat controller class
| Dependencies  :
| > ./../common/config/api{...}
| > ./../middleware/logger/onHttpRequestCompleted(...) as logger
| > ./../common/utils/http-util
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { notSet } = require("../common/utils/object.util")();

/**
 * Creates a new Heartbeat controller instance
 * @param config: configuration instance
 * @param logger: an instance of the log manager
 */
const HeartbeatController = (config, logger) => {
  if (notSet(logger)) {
    throw new Error(
      "HeartbeatController - Logger instance not instantiated or provided"
    );
  }
  if (notSet(config)) {
    throw new Error(
      "HeartbeatController - Configuration instance not instantiated or provided"
    );
  }
  const ping = (request, response) => {
    return logger(__filename, request, response, {
      message: `API is up and running`,
    });
  };
  return {
    ping,
  };
};
module.exports = HeartbeatController;
