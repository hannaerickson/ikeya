## January 13, 2023
Today Missy and I paired off to try to figure out the signup function. I converted it to a form identical to login instead of a modal. We are getting an 'unauthorized' error, so we think the issue is that the account is not actually creating before we pass the credentials to the login function. Will continue troubleshooting. Meanwhile Tyler and Abdoul are trying to get a filter working so that when we click onto a dashboard page, it only shows the rooms for that specific logged in user.

## January 12, 2023
We got the login function working today- after speaking briefly with Riley I discovered we still needed to write some state management functions and an onSubmit for the login function. After doing that we are able to log in on the front end and the token and various details print to our console. I did much of the same for the Signup Form as well but are still working through details to get it to work.

## January 9, 2023
Today we worked in a group before lunch trying to each see if we could make any progress on the authenticator. I briefly dabbled with trying to get a "list accounts" functionality but was unable to make much progress. One small bug fix that Abdoul noticed was needing an 'on delete' method for our FKs in our tables. We weren't able to delete a room that had furniture, but that was a simple fix. Will likely add the same method to our rooms table, so if a user is deleted so are their rooms. However we are having issues with the accounts, so that may be a ways away in terms of functionality.

Considering starting to mock up our SPA main page, since we can't finish the backend until auth is completed.

## January 6, 2023
Still stuck on the authentication blocker. We are at a point where all of our created queries work when not logged in. Without the authentication "Depends", we can log in and logout, but as soon as the dependency is added we lose functionality. Typically we can login once, run some tests and things work, and when we logout and try it again (logging in and running queries) we get the same internal server error. We've gone through the videos again and spent some time today with a few SIERs.

## January 5, 2023
Yesterday we managed to get the query and route working for 'create a room' and 'get all rooms'. Very encouraging. Today we started by getting those same things set up for users, so create a user and get all users. We dabbled a bit in Authentication stuff, but have the lecture on that tomorrow and were running into some issues. Plan for the day is to add some additional paths and a table for furniture as well.

An ah-ha moment was definitely debugging some things. We've seen the same error a few times that means we need to do migrations.

## January 4, 2023
Created a group in Gitlab and forked the Project Gamma repository. Shared my screen and went through the initial setup on Learn with my team. We created a relational-data directory to be able to use multiple databases, a design-service directory for our project, and created a requirements file and a Dockerfile.dev inside the design-service.

Two volumes were created, postgres-data and pg-admin. Some changes were made to our docker-compose file in order to use the PG Admin tool but that is now up and running. We confirmed our ports were showing the correct things such as the base react front-end, the FastAPI docs, etc.

Today's ah-ha moment was just getting everything set up and somewhat working so we can start building our database.
