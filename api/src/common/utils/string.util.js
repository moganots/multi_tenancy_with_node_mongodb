/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : String utility (extension / helper) class
| Dependencies  :
|   > ./object-util.js
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { isSet } = require("./object.util")();

/**
 * Creates a new StringUtil instance
 */
const StringUtil = () => {
  const isEmpty = (value) => {
    return String(value).trim().length === 0;
  };
  const notEmpty = (value) => {
    return !isEmpty(value);
  };
  const hasEmptyString = (items = []) => {
    return items?.filter((item) => isEmpty(item))?.length !== 0;
  };
  const nullIfJoin = (items = [], delimeter = ".") => {
    const fi = items?.filter((item) => isSet(item) && !isEmpty(item));
    return fi?.length > 1
      ? fi?.join(delimeter)
      : fi?.length === 1
      ? fi[0]
      : null;
  };
  const ifNull = (value, option) => {
    return value || option;
  };
  const nullIfTrim = (value, option) => {
    return ifNull(value, option)?.trim();
  };
  const toLocalLowerCaseWithTrim = (value) => {
    return String(value)?.toLocaleLowerCase()?.trim();
  };
  const toLocalLowerCaseWithTrimEnd = (value) => {
    return String(value)?.toLocaleLowerCase()?.trimEnd();
  };
  const toLocalLowerCaseWithTrimStart = (value) => {
    return String(value)?.toLocaleLowerCase()?.trimStart();
  };
  const capitalizeFirstLetter = (value) => {
    return [
      (String(value) || ``).charAt(0).toLocaleUpperCase(),
      (String(value) || ``).slice(1),
    ].join("");
  };
  const splitCamelCase = (value) => {
    return (String(value) || ``).trim().replace(/([a-z])([A-Z])/g, "$1 $2");
  };
  const splitCamelCaseAndSpecialCharacters = (value) => {
    return (String(value) || ``)
      .trim()
      .replace(/([a-z])([A-Z])([._-])/g, "$1 $2 $3");
  };
  const splitCamelCaseAndCapitalizeFirstLetter = (value) => {
    return capitalizeFirstLetter(splitCamelCase(String(value) || ``));
  };

  return {
    isEmpty,
    notEmpty,
    hasEmptyString,
    nullIfJoin,
    ifNull,
    nullIfTrim,
    toLocalLowerCaseWithTrim,
    toLocalLowerCaseWithTrimEnd,
    toLocalLowerCaseWithTrimStart,
    capitalizeFirstLetter,
    splitCamelCase,
    splitCamelCaseAndSpecialCharacters,
    splitCamelCaseAndCapitalizeFirstLetter,
  };
};

module.exports = StringUtil;
