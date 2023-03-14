const productsR = require('./products.r');
const orderR = require('./store.r');
const userR = require('./user.r');

module.exports = (app) => {
    app.use('/products', productsR);
    app.use('/order', orderR);
    // app.use('/user', userR);
    app.use('*', (req, res, next) => {
        next(new Error("Page not found."));
    });
    app.use((err, req, res, next) => {
        res.status(500).send(err.message);
    });
} 