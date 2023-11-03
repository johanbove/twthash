import b32encode from 'base32-encode';
import blake2 from 'blake2';
import { DateTime } from 'luxon';

// @see https://dev.twtxt.net/
// @see https://dev.twtxt.net/doc/twthashextension.html

let twt_created = new Date().toISOString();
let url = 'https://johanbove.info/twtxt.txt';
let content = 'Yeah!';

if (process.argv[2]) {
    content = process.argv[2];
}

if (process.argv[3]) {
    twt_created = process.argv[3];
}

if (process.argv[4]) {
    url = process.argv[4];
}

// console.log('args', process.argv);

function base32(payload) {
    return b32encode(Buffer.from(payload), 'RFC3548', { padding: false });
}

function blake2b256(payload) {
    return blake2.createHash('blake2b', { digestLength: 32 })
        .update(Buffer.from(payload))
        .digest();
}

function formatRFC3339(text) {
    return DateTime.fromISO(text, { setZone: true, zone: 'utc' })
        .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")
        .replace(/\+00:00$/, 'Z');
}

// const twt = {
//     created: '2023-10-27T10:05:39+0200', // new Date().toISOString(),
//     twter: {
//         url: 'https://johanbove.info/twtxt.txt',
//     },
//     content: "We're still here!"
// }

const created = formatRFC3339(twt_created);
const payload = [url, created, content].join('\n');
const hash = base32(blake2b256(payload)).toLowerCase().slice(-7);

// console.log({ created, payload, hash });

console.log(hash);