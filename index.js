import b32encode from 'base32-encode';
import blake2 from 'blake2';
import { DateTime } from 'luxon';

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

function Twthash(twt) {
    const _created = twt.created || new Date().toISOString();
    const url = twt.url || '';
    const content = twt.content || '';

    const created = formatRFC3339(_created);
    const payload = [url, created, content].join('\n');
    const hash = base32(blake2b256(payload)).toLowerCase().slice(-7);

    console.log({ payload, hash });

    return hash;
}

export default Twthash