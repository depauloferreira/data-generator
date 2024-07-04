import stream from "node:stream";
import fs from "node:fs";
import readline from "node:readline"

export function line(file) {
    const fileReadStream = fs.createReadStream(file);
    const lineReader = readline.createInterface({ input: fileReadStream, crlfDelay: Infinity });

    const rs = new stream.Readable({
        read: function () {
            lineReader.on('line', (line) => {
                this.push(line);
            });
            lineReader.on('close', () => {
                this.push(null);
            });
        }
    });

    return rs;
}