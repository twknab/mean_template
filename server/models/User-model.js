// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var UserSchema = new Schema (
    {
        username: {
            type: String,
            minlength: [2, 'Username must be at least 2 characters.'],
            maxlength: [20, 'Username must be less than 20 characters.'],
            required: [true, 'Your username cannot be blank.'],
            trim: true,
            unique: true, // username must be unique
            dropDups: true,
        }, // end username field
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/

// RegEx Validation (Alphanumerical and Underscores Only):
UserSchema.methods.validateUsername = function(username) {
    console.log('Username Creation Validation...Assessing for alphanumer characters and underscores...');
    var regex = /^[a-z0-9_]+$/i;
    return regex.test(username);
};

// Case insensitive query validation instance method:
UserSchema.methods.checkDuplicates = function(username, next) {
    console.log('Username Duplicate Validation...case insensitive querying mongo for duplicates...');
    User.findOne({username: { $regex : new RegExp("^" + username + "$", "i")}})
        .then(function(foundUser) {
            if(foundUser) { // if user is found, the following error is generated and sent to client (phase 1 passed but phase 2 failed):
                console.log('Username Creation Validation ERROR...existing user has been found...validation failed...', foundUser);
                var err = new Error('Username already exists.');
                next(err);
            }
            if(!foundUser) { // if user is not found, then user can proceed to be created
                console.log('Username Creation Validation PASSED...no existing users found...');
                next();
            }
        })
        .catch(function(err) { // if our regex query goes awry this will catch any errors:
            console.log('Error performing case insensitive query to MongoDB...', err);
            next(err);
        })
};

/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
UserSchema.pre('save', function(next) {
    var self = this;

    console.log('TESTING PRE SAVE');
    // Alphanumer and underscore Regex Validation:
    if (self.validateUsername(this.username)) { // if phase 1 validation returns as true, check for duplicates (phase 2)
        console.log('Username Creation Validation PASSED basic alphanum + underscore validation...');
        // Duplicate Check via Case Insensitive Mongoose Query:
        self.checkDuplicates(this.username, next);
    } else {
        console.log('Username Creation Validation ERROR...');
        var err = new Error('Username may contain only letters, numbers or underscores.');
        console.log(err);
        next(err);
    };
});

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var User = mongoose.model('User', UserSchema);

// Export Model:
module.exports = User;
