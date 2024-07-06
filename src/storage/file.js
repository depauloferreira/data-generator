import fs from 'node:fs'

export function fileStorage(path, erase = true) {

    if (erase) {
        fs.writeFileSync(path, '', { flags: 'w' })
    }

    return fs.createWriteStream(path, { flags: 'a' });
}