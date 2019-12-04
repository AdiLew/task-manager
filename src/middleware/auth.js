const auth = async (req, res, next) => {
    console.log('Auth middleware');
    next();
}

module.exports = auth;