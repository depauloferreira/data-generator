import stream from 'node:stream'
import { EOL } from "node:os";

export function doCsvTransformer(object) {
    return [
        `"${Object.keys(object).join(';').replaceAll('"', '\\"').replaceAll(";", '";"')}"${EOL}`,
        `"${Object.values(object).join(';').replaceAll('"', '\\"').replaceAll(";", '";"')}"${EOL}`,
    ]

}
export function csvTransformer() {
    let shouldSetHeader = true;
    const ts = new stream.Transform({
        transform(chunk, _, callback) {
            const object = JSON.parse(chunk.toString())
            const [header, message] = doCsvTransformer(object)
            const transformed = `${shouldSetHeader ? header : ''}${message}`
            shouldSetHeader = false;
            callback(null, transformed);
        }
    })

    return ts;
}