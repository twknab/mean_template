# M E A N   |   T E M P L A T E   |   v 1 . 0

Notes: This file is a modularized MEAN project with a single `User` model schema with
View partials for all CRUD operations.

+ `/server` and `/client` folders have been created
+ `angular` and `angular-route` are installed
+ `mongoose`, `express`, `bodyParser` are installed
+ custom validations in the `User` model has been created

## Overview:
Be sure to customize this project for your needs, and is merely purposed to be a
rubric from which to build a fully functioning MEAN application without having to
do a lot of the more tedious initial tasks, in getting the project setup.

From here, you could either delete the controllers, customize them, add on to them,
or do anything you wish. But the modularization is already to go, as well as
the basic MEAN dependencies. Feel free to remove or add new ones, depending upon
your project needs.

How to customize this template is outlined below, along with a log of technical
issues that I experienced during development/running additions.

## How to Customize:

1. Read this file.

2. Clone this project.

3. Rename your project folder (ie, the folder containing this file).

4. Update the project's destination repo to your own:

	+ `git remote -v` // shows your repo's remote connections
	+ `git remote remove origin` // removes connection to my repo (origin)
	+ `git remote add origin {{your-new-git-project-url}}` // ie, https://github.com.../myUsername/myProject.git

5. Install `node` and `bower` dependencies:

	+ `npm install`
		+ `express`, `body-parser`, and `mongoose` have been setup.
		+ you can add any additional dependencies (ie, `bcrypt`, `express-session` if you want via `npm install {{dependency}}`).
	+ `bower install`
		+ `angular` and `angular-route` have been setup.

6. Update `package.json` to reflect your New Project name and your New Repository:

 	+ Open `/package.json`
	+ Change the `name` field to your project name.
	+ Change the `Repository.url` to your github project  repo.

7. Update database name to a name fitting for your project:

 	+ Open `/server/config/db.js`
	+ Rename `dbName` variable to your desired database name used for MongoDB.

8. Rename any mongoose models (`/server/models`) to fit your initial DB design.

	+ Only one Mongoose model template ('Users')  has been created.

9. Rename your Angular Controller (`/client/controllers`):

	+ `$location` and `$routeParams` have been setup by default:
	**DELETE** if not needed else you will have loaded Angular services into
	your project which are never called.
	+ Two controllers have been setup (`user-controller` and
	`user-edit-controller`), along with ability to load error objects.
	+ The first controller creates, reads all and deletes. The
	second controller edits and reads one. Full CRUD setup ready to go.

10. Rename your  Angular Factory (`/client/factories`) to reflect your design.

	+ Only one Angular Factory has been created: This handles both the
	`user-controller` and the `user-edit-controller`.
	+ `$http` service has been loaded for you, **DELETE** if needed.

11. Update your Angular Routes (`/client/config`) and your initial Views file:

	+ `/client/index.html` is your outer frame,
	+ `/client/html/index.html` is your first partial.
	+ `/client/html/edit.html` is the partial loaded for editing.

12. Make sure you update your Angular Config file (`client/config/app.js`)
	to customize your Angular Module and to add or remove any additional Angular
	services you may need.
	+ `ngRoute` has been setup by default.

13. Check your server routes (`/server/config/routes.js`):

	+ By default a create method is setup for your default mongoose model.
	+ **BE SURE** to update both the mongoose model variable (`User` by default),
	and to update your method to reflect your appropriate mongoose query
	needs. Only one method has been setup.
	+ Restful routing has been setup, along with one route which contains
	a route parameter (ie, `/myroute/:id`)

14. Rename your server controllers:

	+ Only one has been setup to handle all CRUD operations for `User`: `/server/controllers/user-controller.js`

15. Update your primary index page title and content (`/client/index.html`):

	+ `angular`, `angular-route` have been loaded by default.
	+ Your angular app, controllers and factories have been loaded by
	default: **BE SURE** to update these filenames to the changes you made
	above.

16. Update `/server/config/app.js`

	+ If using session, setup, else **DELETE** unneeded commenting (Session
	is already setup, but not `npm` installed, and uncommenting the info
	will invoke it).
	+ bodyParser URL Encoded is setup also for uncommenting and usage.

17. Test your file by launching it!

	+ `npm start` from the root project directory.
	+ By default, the port is setup to run on 8000.
	+ Open your browser: http://localhost:8000 should load!

### New Features Log:

+ **02/22/17**: Cleaned up `Readme.md` Added `.gitignore` to ignore `node_modules`
and `bower_components` folders, removed plural from `UsersController` variable
name to `UserController` in server-side Controller.

### Development Issues Log:

1. Custom RegExp Case Insensitive Query Not Catching Username as It Should:

	+ If my `username` was `timknab`, `timkna` would come back as TRUE, while
	`timknabber` would come back as FALSE when regex testing. Thus, when
	trying to update the username field to `timkna` (from previously, `timknab`)
	was throwing the `already exists` custom error I created, even though this
	user didn't exist. This bug was only found now during the edit build out
	functionality of the CRUD operations.

	### Solution:

	+ I made an error by using the wrong RegExp pattern, when doing my `pre`
	validations for a case insensitive mongoose query (designed to see if
	an existing user, no matter the case, exists).
	+ Because my previous Query was:

	`User.findOne({username: { $regex : new RegExp(username, "i")}})`

	+ This RegExp pattern I was using was incorrect. The `RegExp` obj would
	be built similar to `\timknab\i`, where what we needed, for exact
	string match, is, `\^timknab$\`. So the regex object you were making
	and testing was wrong.
	+ Here is the correct pattern, which searches for **EXACT** word match
	via `^` and `$`:

	`User.findOne({username: { $regex : new RegExp("^" + username + "$", "i")}})`

	+ Adding the carrot and dollar sign symbols lock the pattern to match
	for an exact string. This way, `timkna` won't match for `timknab`,
	like in the previous scenario. Only `timknab` will match for `timknab`,
	exactly.

2. Update operation (`findOneAndUpdate()` via Mongoose) was not running
Validations:

	+ All validations, including post, pre and built in hooks were not running.

	### Solution:

	+ Using `findByIdAndUpdate` bypasses validations and `pre` and `post`
	middleware hooks. You have to nest your queries and invoke `.save()`
	in order for the validations to again run.
	+ To Do This: First lookup the user, then use `.save()`: the `save()`
	function by default runs the validations, including `pre` and `post`
	mongoose middleware hooks.
