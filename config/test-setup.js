require("@babel/register")();

var jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { document } = new JSDOM({
  url: "http://localhost"
}).window;
global.document = document;

global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;

global.navigator = {
  userAgent: "node.js"
};
