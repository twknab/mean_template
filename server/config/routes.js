// Load Controllers:
var UserController = require('./../controllers/user-controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/users', UserController.create)
        .get('/users', UserController.showAll)
        .get('/users/:id', UserController.findOne)
        .put('/users/:id', UserController.update)
        .delete('/users/:id', UserController.delete)
};
