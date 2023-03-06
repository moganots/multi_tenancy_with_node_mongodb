/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Object utility (extension / helper) class
| Dependencies  :
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/**
 * Creates a new ObjectUtil instance
 */
const ObjectUtil = () => {
  const isSet = (value) => {
    return !(value === null || value === undefined);
  };
  const notSet = (value) => {
    return !isSet(value);
  };
  const hasNulls = (items = []) => {
    return items?.filter((item) => !isSet(item))?.length !== 0;
  };
  const appendLeadingZero = (number) => {
    return number <= 9 ? `0${number}` : number;
  };
  const padLeft = (value, padding) => {
    return value?.toString().padEnd(padding.length, padding);
  };
  const padRight = (value, padding) => {
    return value?.toString().padStart(padding.length, padding);
  };
  const ifJoin = (delimiter, ...args) => {
    const filter = args?.filter(
      (arg) => arg && !(String(arg).trim().length === 0)
    );
    switch (filter?.length) {
      case 0:
        return null;
      case 1:
        return filter[0];
      default:
        return filter?.join(delimiter);
    }
  };
  const firstElement = (...args) => {
    return args?.shift();
  };
  const lastElement = (...args) => {
    return args?.slice(-1);
  };
  const elementAt = (index, ...args) => {
    return args?.slice(index);
  };
  const ifMapGetter = (objectMap, key) => {
    return (objectMap && String(key)?.length !== 0) ? objectMap[key] : null;
  }
  return {
    isSet,
    notSet,
    hasNulls,
    appendLeadingZero,
    padLeft,
    padRight,
    ifJoin,
    firstElement,
    lastElement,
    elementAt,
    ifMapGetter
  };
};

module.exports = ObjectUtil;
