## January 26, 2023
Last day! Spent some time with Missy trying to debug getting the update to work more fluidly, but think that will need to be left for a stretch goal. Spent some time on getting the API documentation done. Today we just need to make sure the README is completed and attempt deployment.

## January 25, 2023
Mostly done! Today I wrote a unit test to fetch all accounts as well as create furniture. I did a lot of styling to the site afterwards, re-vamping the main page, creating a few graphics, and custom button classes so all the colors of our site would flow. I noticed a bug with the pages not refreshing after creating a new room or piece of furniture and that took a while. It turns out half of the "state" was missing when it was declared at the beginning of the function, so everything worked, it just wouldn't close the modal afterwards. That's all fixed and working, definitely the ah-ha moment for today. The majority of the site's functionality is done. There are a few QOL features we'll work on time permitting, such as passing an ID so we can move the update button to the specific room cards instead of having one upate button and needing to manually select a room. I'd also like the ability for the update form to autopopulate with your current information. Right now if you want to update only the name, everything else is deleted unless you enter it back in.

## January 24, 2023
Today was a day filled with re-factoring code. I wanted most of our react components to share the same structure and flow for ease of reading and/or debugging later. That took the majority of the morning and in the afternoon I was having internet troubles. I started my unit test and needed to rebuild my images but couldn't due to my internet, so had to put that off.

## January 23, 2023
On the agena today is bootstrap card styling (still) and just general visual appeal. Most of the functionality of the site is done, so this week unit tests also need to be written and worked on. Tyler and Abdoul did start on these previously so hopefully getting the remainder of the tests written shouldn't be too bad.

## January 20, 2023
Still working on the cards. I took a break and finished the 'sidebar' for all the pages, just making them the same size and changing what data is shown. For the dashboard it houses buttons to create or update a room and to create furniture. On the room specific view it shows the room name, who made it, the image and description. I also have a little header as an example of what we want to show if the logged in user is the one who created that room.

Still need to figure out the sizing of the cards, as well as how to complete that credentials check so that we have different options available to a user if they view a room that they created, despite how they navigate to it (either from their dashboard or the all rooms view).

## January 19, 2023
Today the main focus was getting the card components working. Missy got a lot of the code done after class, but they're not too visually appealing and they don't render the same way. We want them to be the same shape and size for all new pieces of data, which is more difficult to get done than we thought.

The main focus I had today regarding these card elements was to get the buttons on them working. The ah-ha moment was that we can create new instances of either a room or a piece of furniture and the page re-renders to show it. We can also delete and they are gone from the front end right away.

## January 18, 2023
Today's ah-ha moment was fixing how the user data was pulled from the database. I wrote a little query in my component to fetch from the token endpoint. The issue before was that if a user didn't have data, like if they were new, it wouldn't show their username on the Dashboard. But by fetching the account data from '/token', we have that information regardless of whether or not they have data.

## January 17, 2023
Completed the filter today for getting only the rooms for a specific logged in user. Also adjusted some database fetches so we can have this as a backend route as suggested instead of doing the filter on the front end. The other main feature I worked on was on the Dashboard page, creating a greeting for the logged in user. Right now it's pulling from our room data, not the token.

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
