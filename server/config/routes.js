// Load Controllers:
var UsersController = require('./../controllers/user-controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/users', UsersController.create)
        .get('/users', UsersController.showAll)
        .get('/users/:id', UsersController.findOne)
        .put('/users/:id', UsersController.update)
        .delete('/users/:id', UsersController.delete)
};
