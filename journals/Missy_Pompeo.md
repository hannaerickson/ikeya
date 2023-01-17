# January 4th

Today was the first day of actual coding for our project. Hanna created a repo and group in GitLab and added Abdoul, Tyler, and I to it. Hanna started us off by sharing her screen and we all talked through the setup process; writing the docker-compose file, setting up Postgres database, and getting all our volumes and containers up and running.

Ah-ha moment: Actually getting everything up an working, solidifying what we learned with hands-on coding.

# January 5th:

Today we created several routes and queries for out design-service API. Tyler took the reigns today and we all talked through GET and POST routes for furniture, as well as GET for a single room, and DELETE a single room. We had a little trouble with our tables and had to go back and add a foreign key to connect furniture and accounts.

Authenticate gave all of us issues, so we decided as a group to wait and listen to tomorrow's lecture to get a better understanding before trying to tackle it again. Riley says this will be the hardest part of the project, so we want to make sure we get it right.

Ah-ha moment: debugging our migrations file, which helped us recognize patterns in the errors we were getting.

# January 6th:

Today we worked almost exclusively on Authentication, trying to get the routes and queries to only load if we were logged in. We kind of got it to work, but adding the Depends part makes the program buggy - it will work until we log out, and then I am unable to log back in until we take it out of the code. Similar, but not exact errors happened for the whole team. We all decided to go over the videos again to try and get a better idea of where we are going wrong.

Ah-ha moment: We got a portion of the authentication to work after much debugging.

# January 9th:

Today Abdoul was able to get DELETE function to work by added "ON DELETE CASCADE" to the table's FK. We are still having issues with the account authentication, getting things to only show up when we are logged in.

Ah-ha moment: Abdoul finding the fix for DELETE; we now know we need it when we are using foreign keys.

# January 12th:

Unfortunately, I was unable to participate in the project today due to a family emergency. I let the team know and will catch up with them tomorrow.

# January 13th:

We started today pairing off, Hanna and I trying to debug signup while Tyler and Abdoul worked on getting the dashboard view to work - so that only the rooms for the user who is signed in would load. Despite all our troubleshooting, we were both unsuccessful, but debugging is always productive, and we always learn from it.

Ah-ha moment: Keep on debugging, try something to see if it works, then undo the change if it doesn't.

# January 16th:

Today is a day off for the school, but I tried to work on debuggin a few of the issues on the project. I decided to create a file named models, in a dir named models, and put all the classes in it for a cleaner code. I was able to get AccountList to work, but despite trying many things, I cannout get rooms_by_user to work. We still get an 422 error, it seems to be expecting room_id somewhere in the query, despite there not being anything that should prompt that.

Ah-ha moment: getting AccountList to work by reviewing old lectures.
