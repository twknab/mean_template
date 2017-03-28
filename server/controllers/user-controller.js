// Grab our Mongoose Model:
var User = require('mongoose').model('User');

module.exports = {
    // Create a user
    create: function(req, res) {
        console.log('Server-side user controller talking...', req.body);
        User.create(req.body)
            .then(function(newUser) {
                return res.json(newUser);
            })
            .catch(function(err) {
                console.log('Error trying to create user!', err);
                if (err.errors == null) {
                    console.log('Custom Validator Function Error detected...');
                    return res.status(500).json({
                        custom: {
                            message: err.message
                        }
                    });
                } else {
                    console.log('Built in Mongoose Validation detected....');
                    return res.status(500).json(err.errors)
                };
            })
    },
    showAll: function(req, res) {
        console.log('Server-side user controller talking...showing all posts...');
        User.find({})
            .then(function(allUsers) {
                return res.json(allUsers);
            })
            .catch(function(err) {
                console.log('Error finding all users', err);
                return res.status(500).json(err);
            })
    },
    findOne: function(req, res) {
        User.findOne({_id: req.params.id})
            .then(function(userToEdit) {
                req.user = userToEdit; // attaches user to req for easy access later
                return res.json(userToEdit);
            })
            .catch(function(err) {
                console.log('Error finding user to edit...', err);
                return res.status(500).json(err);
            })
    },
    update: function(req, res) {
        User.findOne({_id: req.params.id})
            .then(function(foundUser) {
                foundUser.username = req.body.username;
                foundUser.save()
                    .then(function(savedUser) {
                        console.log('User successfully saved and updated!', savedUser);
                        return res.json(savedUser);
                    })
                    .catch(function(err) {
                        console.log('Error updating and saving user!', err);
                        if (err.errors == null) {
                            console.log('Custom Validator Function Error detected...');
                            return res.status(500).json({
                                custom: {
                                    message: err.message
                                }
                            });
                        } else {
                            console.log('Built in Mongoose Validation detected....');
                            return res.status(500).json(err.errors)
                        };
                    });
            })
            .catch(function(err) {
                console.log('There has been an error!');
                return res.status(500).json(err);
            })
    },
    delete: function(req, res) {
        User.remove({_id: req.params.id})
            .then(function() {
                return res.json('Delete Success!');
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
};
