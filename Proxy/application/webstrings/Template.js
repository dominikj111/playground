import { JSDOM, VirtualConsole } from "jsdom";
import {execSync} from 'child_process'; 
import {getMetas, addToMetas} from './Metas.js';
import {writeFileSync} from 'node:fs';
import { resolve } from "path";

const __parent_dirname = import.meta.url.replace("file://", "").split("/").slice(0, -2).join("/") + "/";
const templateFileName = resolve(__parent_dirname, "index.html");

const fetchedHtml = execSync(`
    curl --silent -X POST \
        --header "Cookie: ${Object.entries(getMetas().cookies).map(([key, value]) => `${key}=${value}`).join("; ")}" \
        --header "Content-Type: application/json" \
        'https://dev.any-survey.com/reports/index.cfm?action=analysis.xfactor'`, { encoding: 'utf8' })
        
    .replace(/(window\.)?isSentryEnabled\s*=\s*(\d+|true|false);?/g, "window.isSentryEnabled = false;");

const dsn = fetchedHtml.match(/<i class="fa fa-info-circle text-aqua"><\/i> DSN: (\w+)/)?.[1];

addToMetas({dsn});

const virtualConsole = new VirtualConsole(); // will hide console errors
const jsdom = new JSDOM(fetchedHtml, { runScripts: "dangerously", resources: "usable", virtualConsole });
const {window} = jsdom;
const {document} = window;

jsdom.window.onload = () => { addToMetas({filter: jsdom.window.survey_filter}); };

document.querySelector("noscript").outerHTML = "";

const content = document.querySelector(".content .row .col-md-12 .box .box-header.with-border") ?? document.querySelector(".content .row .col-md-12");
content.innerHTML = "<div id='react-app'></div>";

const appScript = document.createElement("script");
appScript.type = "module";
appScript.src = "/src/main.tsx";

document.querySelector("body").append(appScript);

writeFileSync(templateFileName, jsdom.serialize());
