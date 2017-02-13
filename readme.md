M E A N  |  T E M P L A T E	 |  v 1 . 0

Notes: This file is a modularized MEAN project with a single `User` model schema with
View partials for all CRUD operations.

+ `/server` and `/client` folders have been created
+ `angular` and `angular-route` are installed
+ `mongoose`, `express`, `bodyParser` are installed
+ custom validations in the `User` model has been created

Be sure to customize this project for your needs, and is merely purposed to be a
rubric from which to build a fully functioning MEAN application without having to
do a lot of the more tedious initial tasks, in getting the project setup.

From here, you could either delete the controllers, customize them, add on to them,
or do anything you wish. But the modularization is already to go, as well as
the basic MEAN dependencies. Feel free to remove or add new ones, depending upon
your project needs.

Here's a rough overview of how this file can be customized, or what you might
want to do in order to do so. There's also a log at the bottom of some of the
technical developmental issues I hit when building things out. I kept this there
for my future reference, if I ever hit the same issues again when building.

One last note: The `/server/server.js` has been modularized already. I also setup
some Mongoose Middleware, in the event you use session and want an easy way to
manage data. This can be deleted along with the `/server/middlware` folder if
you are not requiring it for your project.


[HOW TO CUSTOMIZE]:

	+ 1: Read this file.

	+ 2: Rename your project folder (ie, the folder containing this file).

	+ 3: Make sure to update your database name in the `/server/config/db.js` file
	(else MongoDB won't work).

	+ 4: Rename any mongoose models (`/server/models`) to fit your initial DB design.
   		Note: Only one Mongoose model template ('Users')  has been created.

	+ 5: Rename your Angular Controller (`/client/controllers`)
		Note: `$location` and `$routeParams` have been setup by default:
		 **DELETE** if not needed else you will have loaded Angular services into
		 your project which are never called.
		Note: Two controllers have been setup (`user-controller` and
		`user-edit-controller`), along with ability to load error objects.
                Note: The first controller creates, reads all and deletes. The
				second controller edits and reads one. Full CRUD setup ready to go.

	+ 6:  Rename your  Angular Factory (`/client/factories`) to reflect your design.
		Note: Only one Angular Factory has been created: This handles both the
		`user-controller` and the `user-edit-controller`.
		Note: `$http` service has been loaded for you, **DELETE** if needed.

	+ 7: Update your Angular Routes (`/client/config`) and your initial Views file:
		Note: `/client/index.html` is your outer frame.
		`/client/html/index.html` is your first partial.
                Note: `/client/html/edit.html` is the partial loaded for editing.

	+ 8: Make sure you update your Angular Config file (`client/config/app.js`)
	to customize your Angular Module and to add or remove any additional Angular
	services you may need.
		+ Note: `ngRoute` has been setup by default.

	+ 9: Check bower dependencies:
		Note: `angular` and `angular-route` are setup by default.
		Note: You may want to reinstall these and `--save` to make sure you get
		latest copies before starting your work.
                Use: `bower install`

	+ 10: Check npm dependencies:
		Note: `express`, `mongoose` and `body-parser` are setup by default.
		Note: You may want to reinstall these and `--save` to make sure you get
		latest copies before starting your work.
		Use: 'npm install'

	+ 11: Check your server routes (`/server/config/routes.js`):
		Note: By default a create method is setup for your default mongoose model.
		 **BE SURE** to update both the mongoose model variable (`User` by default),
		  and to update your method to reflect your appropriate mongoose query
		  needs. Only one method has been setup.
		Note: Restful routing has been setup, along with one route which contains
		a route parameter (ie, `/myroute/:id`)

	+ 12: Rename your server controllers:
		Note: Only one has been setup to handle all CRUD operations for `User`: `/server/controllers/user-controller.js`

	+ 13: Update your primary index page title and content (`/client/index.html`):
		Note: `angular`, `angular-route` have been loaded by default.
		Note: Your angular app, controllers and factories have been loaded by
		default: **BE SURE** to update these filenames to the changes you made
		above.

	+ 14: Update `/server/config/app.js`
		Note: If using session, setup, else **DELETE** unneeded commenting (Session
			 is already setup, but not `npm` installed, and uncommenting the info
			 will invoke it).
		Note: bodyParser URL Encoded is setup also for uncommenting and usage.

	+ 15: Test your file by launching it!
		Note: run, `npm start` from the root project directory.
		By default, the port is setup to run on 8000.


[ISSUES DURING DEVELOPMENT LOG]:

	[ISSUE #1] Custom RegExp Case Insensitive Query Not Catching Username as It Should:

		+ If my `username` was `timknab`, `timkna` would come back as TRUE, while
		 `timknabber` would come back as FALSE when regex testing. Thus, when
		 trying to update the username field to `timkna` (from previously, `timknab`)
		 was throwing the `already exists` custom error I created, even though this
		 user didn't exist. This bug was only found now during the edit build out
		 functionality of the CRUD operations.

		[SOLUTION]:

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

	[ISSUE #2] Update operation (`findOneAndUpdate()` via Mongoose) was not running
	Validations:

		+ All validations, including post, pre and built in hooks were not running.

		[SOLUTION]:

			+ Using `findByIdAndUpdate` bypasses validations and `pre` and `post`
			middleware hooks. You have to nest your queries and invoke `.save()`
			in order for the validations to again run.

			+ To Do This: First lookup the user, then use `.save()`: the `save()`
			function by default runs the validations, including `pre` and `post`
			mongoose middleware hooks.
