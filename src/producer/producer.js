import stream from 'node:stream'

export function producer(generator, count) {
    let created = 0;

    const rs = new stream.Readable({
        objectMode: true,
        read() {
            if (created < count) {
                this.push(generator());
                created++;
            } else {
                this.push(null);
            }
        }
    });

    return rs;
}