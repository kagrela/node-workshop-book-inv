module.exports = function (req, res, next) {
    console.log('Req:', Date.now());
    next();
};
