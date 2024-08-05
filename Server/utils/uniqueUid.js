import crypto from 'crypto'

function generateUserId(prefix) {
    const randomPart = crypto.randomBytes(3).toString('hex');
    return `${prefix}${randomPart}`;
}
export {generateUserId}