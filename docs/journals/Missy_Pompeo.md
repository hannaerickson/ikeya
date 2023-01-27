# January 27th:

today is the last day of the project. I worked a little last night on the Update form, so that now when the user clicks the update button the form auto-populates with the information that is already there. I was able to grey out the text a little until the user clicked into the box, at which point the opacity would go back to 1. I felt accomplished that I was able to do this, when updateform kicked my butt so badly for two days.

We plan on going over the code together line by line to make sure everything looks the best it can, and that there is nothing that needs to be taken out. After that, we will submit our project and start studying for the final exam.

ah-ha moment: TIME FLYS BY! I cannot believe we are already done, from start to finish, of this site.

# January 26th:

Hanna was able to talk to a seir yesterday and they managed to get the update form working correctly. Today I spent updating readme by adding functionality, and working on getting two tests to pass. It was harder than I thought it would be and I had to go back and rewatch the lecture to really understand where I was going wrong, but I evenutally got it and was able to make two that worked.

ah-ha moment: Sometimes I should just ask for help when I'm completely stuck.

# January 25th:

Still working on the updateroomform. The form is kind of working, but it is only changing the data in the most recently created room no matter which button is pushed. Spent a lot of time console logging room_id, and going back and forth between updateroom.js and dashboard.js to figure out what the issue was and why its not working. Still not working correctly, but I feel very close.

ah-ha moment: sometimes you need to start over from scratch to see where the logic is failing you.

# January 24th:

Spent all day working on getting the updateRoomForm to automatically get the room_id without the user having to pick from a list. We are hoping the update button, like the delete button, can be in the footer of the card and know what room needs to be updated by just pushing the button.

ah-ha moment: It's a lot hard to do that than I thought it would be.

# January 23rd:

Today I worked on getting the NavBar to only show certain links when the user was logged in, and others when they weren't. I took my time reading the documentation on MDB Navbar code for bootstrap and now feel very familiar with how it all works together.I also played around with the styling for the front page. It's not permenant, but it was good practice. I also worked on moving the sidebar buttons to the top of the page after the group discussed how we wanted the design to look. It was more practice working with bootstrap and figuring out how to get the page to look the way I needed it to look. The biggest issues I had were getting things aligned correctly and trying to figure out the heirachy of CSS. I spent a lot of time in the dev tools and reading documentation.

Ah-ha moment: Reading the documentation but taking the time to change little things here and there really helped understand how it all works.

# January 20th:

I spent a lot of time outside of class hours getting the card components to work on all the pages. They are not styled yet, but they are functional. I started today adding the furniture form link to RoomView, making sure the delete button was working properly, and that the data was populating as it should. Then I moved on to creating a furniture forms so that the user can add furniture to a specific room.

Ah-ha moment: looking at the code Tyler and Abdoul wrote for their forms help me figure out some logic I was missing in mine.

# January 19th:

I spent today updating roomView and getting it to finally pull data. When I was stuck I brought it to the group and we looked over the code; having their input really helped me talk the code out and see where I was having issues in the logic. RoomView is now working as it should, though it still needs to be styled.

ah-ha moment: asking for help from the group gave me the opportunity to talk it out and see the errors in my code logic.

# January 18th:

Today I worked on creating a "roomview" that shows the details of a room when opened. This is where the user will see all their furniture in one place. It is still not pulling data and I still need ot fix a few things in bootstrap, but a big chunk of it got finished today.

Ah-ha moment: Creating a second file gave me a chance to have the one that was almost working still intact when I needed to change a lot of things.

# January 17th:

Tyler and I worked together today to try and fix our sign-up form. We were getting a 401 error when we tried to submit the form. We tried debugging for a few hours to see what was causing the problem, but were unable to come up with a solution that worked. Hanna and Abdoul were more sucessful - they were able to get the dashboard page to only show the rooms associated with the user that was logged in.

Ah-ha moment: Following the cookboot exactly. Any diviation from it caused a lot of unnecessary issues.

# January 16th:

Today is a day off for the school, but I tried to work on debuggin a few of the issues on the project. I decided to create a file named models, in a dir named models, and put all the classes in it for a cleaner code. I was able to get AccountList to work, but despite trying many things, I cannout get rooms_by_user to work. We still get an 422 error, it seems to be expecting room_id somewhere in the query, despite there not being anything that should prompt that.

Ah-ha moment: getting AccountList to work by reviewing old lectures.

# January 13th:

We started today pairing off, Hanna and I trying to debug signup while Tyler and Abdoul worked on getting the dashboard view to work - so that only the rooms for the user who is signed in would load. Despite all our troubleshooting, we were both unsuccessful, but debugging is always productive, and we always learn from it.

Ah-ha moment: Keep on debugging, try something to see if it works, then undo the change if it doesn't.

# January 12th:

Unfortunately, I was unable to participate in the project today due to a family emergency. I let the team know and will catch up with them tomorrow.

# January 9th:

Today Abdoul was able to get DELETE function to work by added "ON DELETE CASCADE" to the table's FK. We are still having issues with the account authentication, getting things to only show up when we are logged in.

Ah-ha moment: Abdoul finding the fix for DELETE; we now know we need it when we are using foreign keys.

# January 6th:

Today we worked almost exclusively on Authentication, trying to get the routes and queries to only load if we were logged in. We kind of got it to work, but adding the Depends part makes the program buggy - it will work until we log out, and then I am unable to log back in until we take it out of the code. Similar, but not exact errors happened for the whole team. We all decided to go over the videos again to try and get a better idea of where we are going wrong.

Ah-ha moment: We got a portion of the authentication to work after much debugging.

# January 5th:

Today we created several routes and queries for out design-service API. Tyler took the reigns today and we all talked through GET and POST routes for furniture, as well as GET for a single room, and DELETE a single room. We had a little trouble with our tables and had to go back and add a foreign key to connect furniture and accounts.

Authenticate gave all of us issues, so we decided as a group to wait and listen to tomorrow's lecture to get a better understanding before trying to tackle it again. Riley says this will be the hardest part of the project, so we want to make sure we get it right.

Ah-ha moment: debugging our migrations file, which helped us recognize patterns in the errors we were getting.

# January 4th

Today was the first day of actual coding for our project. Hanna created a repo and group in GitLab and added Abdoul, Tyler, and I to it. Hanna started us off by sharing her screen and we all talked through the setup process; writing the docker-compose file, setting up Postgres database, and getting all our volumes and containers up and running.

Ah-ha moment: Actually getting everything up an working, solidifying what we learned with hands-on coding.
