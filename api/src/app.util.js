/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Utility (helper) for the main App
| Dependencies  :
|   > http
|   > https
|   > ./middleware/logging/logger/(info, error, fatal)
|   > ./common/utils/string.util
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
module.exports = (info, error, fatal) => {
  const { notEmpty } = require("./common/utils/string.util")();
  /**
   * Creates and instantites server using the specified parameters
   * @param {*} serverType the server type to be started, allowed value(s) are Http or Https
   * @param {*} app an instance of the Express app to attach the server instance to
   * @param {*} credentials the credentials (key file, certficate file, etc) to be applied
   * @param {*} headersTimeout the timeout for the headers
   * @param {*} keepAliveTimeout the timout for keeping the server alive
   * @param {*} timeout the maximum timeout for the server
   * @returns
   */
  const createServerHandler = (
    serverType,
    app,
    credentials = {},
    headersTimeout = 600000,
    keepAliveTimeout = 600000,
    timeout = 600000
  ) => {
    if (app) {
      let server;
      switch (serverType) {
        case `https`:
        case `Https`:
        case `HTTPS`:
          server = require(`https`).createServer(credentials, app); // https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
          break;
        default:
          server = require(`http`).createServer(app);
          break;
      }
      server.headersTimeout = parseInt(headersTimeout);
      server.keepAliveTimeout = parseInt(keepAliveTimeout);
      server.setTimeout(parseInt(timeout));
      info(
        __filename,
        `createServerHandler`,
        `${serverType.toLocaleUpperCase()} API server instance created successfully`
      );
      return server;
    }
    throw new Error(
      `Express app not provided, cannot create ${serverType.toLocaleUpperCase()} API server`
    );
  };
  /**
   * Starts up a server
   * @param {*} server the instance of the server to be started up
   * @param {*} port the port number on which the server will be listening and/or running
   * @param {*} baseUri the base URI of the server
   * @param {*} keepAliveTimeout the keep alive timeout for the server
   * @param {*} timeout the timeout for the server
   */
  const startServerHandler = async (
    server,
    port,
    baseUri,
    keepAliveTimeout,
    timeout
  ) => {
    if (server && port && notEmpty(baseUri)) {
      server.on(`connection`, function (socket) {
        socket.setKeepAlive(parseInt(keepAliveTimeout));
        socket.setTimeout(parseInt(timeout));
        info(
          __filename,
          `startServerHandler()/server.on('connection')`,
          `Successfully created a socket connection to the API server at ${baseUri}`
        );
      });
      server.on(`close`, () => {
        info(
          __filename,
          `startServerHandler()/server.on('close')`,
          `All requests to the ${baseUri} API server have been stopped`
        );
        info(
          __filename,
          `startServerHandler()/server.on('close')`,
          `The ${baseUri} API server is in the process of shutting down`
        );
      });
      server.on(`closed`, () => {
        info(
          __filename,
          `startServerHandler()/server.on('closed')`,
          `The ${baseUri} API server has successfuylly shutdown`
        );
      });
      server.on(`error`, (err) => {
        error(__filename, `startServerHandler()/server.on('error')`, err);
      });
      server.listen(port, () => {
        info(
          __filename,
          `startServerHandler()/server.listen`,
          `API server started and listening at ${baseUri}`
        );
      });
    }
  };
  /**
   * Stops an active and running server
   * @param {*} server the instance of the server to be stopped
   */
  const stopServerHandler = async (server) => {
    if (server) {
      server.close(() => {});
    }
  };
  return {
    createServerHandler,
    startServerHandler,
    stopServerHandler,
  };
};
