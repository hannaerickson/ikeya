# Journals

## January 5th:

Created some design service routes and queries for our project. Had a bit of a road bump with our fastapi though, as we forgot to add some variables created within other queries to other files, as they are connected by way of a foreign key.

### January 6th:

Were making authentication tokens for our login and logout routes, which was a real pain in the butt. After some clarification though, we were able to make a breakthrough and get them mostly working. Just have to iron out a few kinks and we'll be good to go.

#### January 9th:

Fixed that pesky delete function today. Just had to add ON DELETE CASCADE to our table file, as we had a foreign key which was affecting our delete function.

### January 10th:

Trying to get the login function working, been a real pain the in the butt but we've made some good progress.

##### January 13th:

Tyler and I are trying to get the user logged-in view on the front end side of things working today, but we're struggling on where we would need to put an if statement for this code so we can filter the users views from each other.

###### January 17th:

Hanna and I were able to get the route for our retrieving all the rooms from a single user rather than all the users working today. Just had to change the name of the route!

###### January 18th:

Trying to get these unit tests running, was stuck on getting the tests to show for a long time but it was because I forgot to .py at the end of my file.... A lesson was learned today. The tests are failing but at least they're running successfully right now so that's a win in my book!

#### January 19th:

Working on getting our Create some furniture form working on the front end side today. I was able to finishing making the form show up on our development server, but I can't seem to get the rooms to populate currently. I also have to make sure it's only the rooms for the current user logged in as well.

#### January 20th:

Was able to get the create some furntiure form working on the front end side without issue. It wasn't working at first and I was getting a CORS error but all I had to do was login into our website through the front end side rather than through the back end side. Working on the unit tests today but struggling with getting the tests to pass.

#### January 23rd:

I got one of my 2 unit tests to pass!!! Just had to change the name of one of my functions. The 2nd unit test is making me really mad though. The other test was easy enough but it's a different story with authentication needed. If i figure out how to get this working the rest of the tests should be easy but right now, no such luck. Sigh.
