import TwtHash from './index.js';

const twt = {}

if (process.argv[2]) {
    twt.content = process.argv[2];
}

if (process.argv[3]) {
    twt.created = process.argv[3];
}

if (process.argv[4]) {
    twt.url = process.argv[4];
}

const theHash = TwtHash(twt);
console.log('The Twthash is', theHash);