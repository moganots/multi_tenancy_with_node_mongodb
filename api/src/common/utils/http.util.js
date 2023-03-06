/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : HTTP utility (extension / helper) class
| Dependencies  :
|   > ./object-util
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { isSet, notSet, ifJoin, lastElement } = require("./object.util")();
const { notEmpty } = require("./string.util")();

/**
 * Creates a new HttpUtil instance
 */
const HttpUtil = () => {
  const setUri = (
    protocol,
    hostname,
    port = null,
    baseUrl = null,
    relativeUrl = null
  ) => {
    return ifJoin(
      "/",
      setProtocol(protocol),
      setHost(hostname, port),
      baseUrl,
      relativeUrl
    );
  };
  const setProtocol = (protocol) => {
    return notEmpty(protocol) ? `${protocol}:/` : null;
  };
  const setHost = (hostname, port) => {
    return notEmpty(hostname) && notEmpty(port)
      ? ifJoin(":", hostname, port)
      : null;
  };
  const setRoute = (...args) => {
    return `/${args?.join(`/`)}`;
  };
  const getRequestUid = (request) => {
    return request?.query?.uid || request?.params?.uid || request?.body?.uid;
  };
  const formatRequestResult = (data, message, error) => {
    return {
      data: data,
      hasError: isSet(error),
      message: message || error?.message || message,
      messageDetailed: error?.stack || error?.stackTrace,
    };
  };
  const getRequestParamsAsPredicate = (params) => {};
  const getRequestQueryAsPredicate = (query) => {};
  const getRequestStatusCode = (logType, methodName = null) => {
    let isError = [`error`, `Error`, `ERROR`].includes(logType || ``);
    if (
      [`auth`, `authenticate`, `authentication`, `login`, `logout`].includes(
        (methodName || ``).toLocaleLowerCase().trim()
      ) &&
      isError
    )
      return 401;
    return isError ? 400 : 200;
  };
  const getRequestPacket = (request) => {
    if (notSet(request)) return null;
    const method = request.method;
    const protocol = request.protocol;
    const hostname = request.hostname;
    const port = lastElement(request.socket.server._connectionKey, `:`);
    const baseUrl = request.baseUrl;
    const relativeUrl = request.path;
    const absoluteUrl = setUri(protocol, hostname, port, baseUrl, relativeUrl);
    return {
      contentType: request.headers["content-type"],
      method: method,
      protocol: protocol,
      hostname: hostname,
      port: port,
      baseUrl: baseUrl,
      relativeUrl: relativeUrl,
      absoluteUrl: absoluteUrl,
      absoluteUrlWithHttpMethod: `${method}->${absoluteUrl}`,
      anchorName: relativeUrl.split(`/`).slice(-2, -1)[0],
      action: relativeUrl.split(`/`).slice(-1)[0],
      parameters: request.params,
      body: request.body,
      client: {
        address: request.connection.remoteAddress,
        useragent: request.headers["user-agent"],
      },
    };
  };
  return {
    setUri,
    setProtocol,
    setRoute,
    getRequestUid,
    formatRequestResult,
    getRequestParamsAsPredicate,
    getRequestQueryAsPredicate,
    getRequestStatusCode,
    getRequestPacket,
  };
};
module.exports = HttpUtil;
