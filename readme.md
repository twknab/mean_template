////////////////////
////
///  R E A D   M E:
//

** Warning: **

This file is merely a moduralized code template for a MEAN application. That is to say, a `/server` and `/client` folder have been created, along with relevant nested files that are necessary when creating a MEAN application.

[MAKE SURE TO DO THE FOLLOWING:]

	+ 1: Read this file.

	+ 2: Rename your project folder (ie, the folder containing this file).

	+ 3: Make sure to update your database name in the `/server/config/db.js` file (else MongoDB won't work).

	+ 4: Rename any mongoose models (`/server/models`) to fit your initial DB design.
   		Note: Only one Mongoose model template has been created.

	+ 5: Rename your Angular Controller (`/client/controllers`)
		Note: `$location` and `$routeParams` have been setup by default:
		 **DELETE** if not needed else you will have loaded Angular services into your project which are never called.
		Note: One controller has been setup, along with ability to load error objects.

	+ 6:  Rename your  Angular Factory (`/client/factories`) to reflect your design.
		Note: Only one Angular Controller and one Factory template  has been created.
		Note: `$http` service has been loaded for you, **DELETE** if needed.

	+ 7: Update your Angular Routes (`/client/config`) and your initial Views file:
		Note: `/client/index.html` is your outer frame.
		`/client/html/index.html` is your first partial.

	+ 8: Make sure you update your Angular Config file (`client/config/app.js`) to customize your Angular Module and to add or remove any additional Angular services you may need.
		+ Note: `ngRoute` has been setup by default.

	+ 9: Check bower dependencies:
		Note: `angular` and `angular-route` are setup by default.
		Note: You may want to reinstall these and `--save` to make sure you get latest copies before starting your work.

	+ 10: Check npm dependencies:
		Note: `express`, `mongoose` and `body-parser` are setup by default.
		Note: You may want to reinstall these and `--save` to make sure you get latest copies before starting your work.

	+ 11: Check your server routes (`/server/config/routes.js`):
		Note: By default a create method is setup for your default mongoose model. **BE SURE** to update both the mongoose model variable (`User` by default), and to update your method to reflect your appropriate mongoose query needs. Only one method has been setup.

	+ 12: Rename your server controllers:
		Note: Only one has been setup for you, `/server/controllers/user-controller.js`

	+ 13: Update your primary index page title and content (`/client/index.html`):
		Note: `angular`, `angular-route` have been loaded by default.
		Note: Your angular app, controllers and factories have been loaded by default: **BE SURE** to update these filenames to the changes you made above.

	+ 14: Update `/server/config/app.js`
		Note: If using session, setup, else **DELETE** unneeded commenting (Session is already setup, but not `npm` installed, and uncommenting the info will invoke it).
		Note: bodyParser URL Encoded is setup also for uncommenting and usage.

	+ 15: Test your file by launching it!
		Note: run, `npm start` from the root project directory.
		By default, the port is setup to run on 8000.



[STATUS]:

	[ISSUE #1] Custom RegExp Case Insensitive Query Not Catching Username as It Should:

		For my Update function (see `/server/controller/user-controller.js`), I am using "findByIdAndUpdate()", which unfortunately bypasses my validations (pre and post hooks), along with the built in validators.

		When I tried to do a nested sort of find and then update the username and save, I was hitting a duplication issue where it was saying my entry already existed (and wouldn't allow me to shorten the username), but would allow me to lengthen it. Very weird. Any idea what I'm doing wrong?

		Can you add the 'delete' functionality to this project?

		[SOLUTION]:

			Turns out I was using the wrong RegExp pattern. Because my previous Query was: `User.findOne({username: { $regex : new RegExp(username, "i")}})`, and say my `username` was `timknab`, `timkna` would come back as TRUE, while `timknabber` would come back as false. Thus, trying to update the username to `timkna` was throwing the `already exists` custom error I created, even though this user didn't exist. This is because the RegExp pattern I was using was incorrect. Here is the correct pattern, which searches for **EXACT** word match via `^` and `$`

	[ISSUE #2] Update operation (`findOneAndUpdate()` via Mongoose) was not running Validations:

		All validations, including post, pre and built in hooks were not running. This is because the `findOneAndUpdate()` mongoose method overrides this by default and there is nothing you can do. However, we did a nested mongoose query, where first we lookup the user, then we use `.save()`, and the `save()` function by default runs the validations, including `pre` and `post` mongoose middleware hooks.
