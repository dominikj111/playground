import {execSync} from 'child_process'; 
import {getMetas, addToMetas} from './Metas.js';


const __filename = import.meta.url.split("/").pop();
// eslint-disable-next-line no-undef
const isRanInCLI = process.argv.some(it => it.includes(__filename));

export function getSecurityCookies() {
    return Object.entries(getMetas().cookies).map(([key, value]) => `${key}=${value}`).join("; ")
}

function fetchCookies(url) {
    const responseHeaders = execSync(`curl --head --silent '${url}'`, { encoding: 'utf8' });
    const cookiesToSet = responseHeaders.split('\n')
            .filter(it => it.includes("set-cookie: ") || it.includes("set-cookie: "))
            .map(it => it.split("set-cookie: ")[1].trim())
            .map(it => {
                let [key, value] = it.split("=");
                value = value.match(/([a-z]|[A-Z]|\d|-)+/)[0];
                return {[key]: value}
            });

    return cookiesToSet.reduce((acc, it) => ({...acc, ...it}));
}

if (isRanInCLI) {
    const cookies = fetchCookies("https://dev.any-survey.com/reports/index.cfm?action=system.migrations&j_username=john.whish&j_password=Slonice4Slonice4");
    const output = execSync(`
        curl --silent -X POST \
            --header "Cookie: ${Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join("; ")}" \
            --header "Content-Type: application/json" \
            'https://dev.any-survey.com/reports/index.cfm/api/v1/completions/completions'`, { encoding: 'utf8' });

    if (output.includes("Forgotten your username?")) {
        console.error("dev.any-survey.com login connection failed");
        // eslint-disable-next-line no-undef
        exit(1);
    } else {
        console.log("dev.any-survey.com login connection confirmed");
        addToMetas({cookies});
    }
}
