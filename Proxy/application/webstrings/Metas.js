import {writeFileSync, readFileSync} from 'node:fs';
import { resolve } from "path";

const __dirname = import.meta.url.replace("file://", "").split("/").slice(0, -1).join("/") + "/";
const metasFileName = resolve(__dirname, "metas.json");

export function getMetas() {
    try {
        const storedMetas = JSON.parse(readFileSync(metasFileName, 'utf8'));
        return storedMetas;
    } catch(error) {
        writeFileSync(metasFileName, JSON.stringify({}, null, 2));
        return {};
    }
}

export function addToMetas(data) {
    const storedMetas = getMetas();
    const newMetas = {...storedMetas, ...data};

    writeFileSync(metasFileName, JSON.stringify(newMetas, null, 2));
}
