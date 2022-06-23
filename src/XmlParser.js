import { isIE } from "./util";

function parseXmlIE(str) {
  var oXML = new ActiveXObject("Microsoft.XMLDOM"); // eslint-disable-line
  oXML.loadXML(str);
  return oXML;
}

function parseXmlModern(str) {
  return new DOMParser().parseFromString(str, "text/xml");
}

export function parseXml(str) {
  if (isIE) {
    return parseXmlIE(str);
  }
  return parseXmlModern(str);
}
