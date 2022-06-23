import { isIE } from "./util";
const supportsXsltProcessor =
  document.implementation && document.implementation.createDocument;

function renderXslToIframeIE(xml, xsl, target) {
  target.open();
  target.write(xml.transformNode(xsl));
  target.close();
}

function renderXslToIframeModern(xml, xsl, target) {
  const xsltProcessor = new XSLTProcessor();

  xsltProcessor.importStylesheet(xsl);
  const resultDocument = xsltProcessor.transformToDocument(xml);

  if (!resultDocument) return;

  target.open();
  target.write(resultDocument.documentElement.outerHTML);
  target.close();
}

export function renderXslToIframe(xml, xsl, target) {
  if (isIE) {
    renderXslToIframeIE(xml, xsl, target);
  } else if (supportsXsltProcessor) {
    renderXslToIframeModern(xml, xsl, target);
  } else {
    throw new Error("XSLT is not supported by your Browser");
  }
}
