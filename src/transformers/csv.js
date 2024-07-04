import stream from 'node:stream'
import { EOL } from "node:os";

export function transformer() {
    let shouldSetHeader = true;
    const ts = new stream.Transform({
        transform(chunk, _, callback) {
            const object = JSON.parse(chunk.toString())
            const header = `"${Object.keys(object).join(';').replaceAll('"', '\\"').replaceAll(";", '";"')}"${EOL}`
            const transformed = `${shouldSetHeader ? header : ''}"${Object.values(object).join(';').replaceAll('"', '\\"').replaceAll(";", '";"')}"${EOL}`;
            shouldSetHeader = false;
            callback(null, transformed);
        }
    })

    return ts;
}