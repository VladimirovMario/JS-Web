const bcrypt = require('bcrypt')

async function hash(password) {
    return bcrypt.hashSync( password, 10 );
}

async function compare(password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
    hash,
    compare
}