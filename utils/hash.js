import fs from 'fs';
const crypto = require('crypto');

const getHash = path => new Promise((resolve, reject) => {
 const hash = crypto.createHash('sha256');
 const rs = fs.createReadStream(path);
 rs.on('error', reject);
 rs.on('data', chunk => hash.update(chunk));
 rs.on('end', () => resolve(hash.digest('hex')));
})

export default getHash;