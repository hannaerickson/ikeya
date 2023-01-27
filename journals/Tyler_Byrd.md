Project IKEYA - Development Journal

## Friday, January 27, 2023
Today is our official last day of the project.  Missy was able to get a make an update to the “Update a Room” form which ensures that the data auto populates, when users open the form.  This is a huge accomplishment since this is an issue that we have been wanting to fix for a few days.  We plan to spend today making sure that the formatting of our code is very clean.  We plan to use black and flake8 to ensure that our code is properly formatted.

The ah-ha moment of the day is that when you initially start a large project it can seem very intimidating but once you break it into smaller pieces it can be easy to accomplish.  When we started this project, it was such a huge out of reach task, but with consistent work we were able to finish our project.  

## Thursday, January 26, 2023
Today I updated the README file with the team member names, the unit tests, the setup instructions and a description of our target audience. My team members worked on the other portions of the ReadME file. 

The ah-ha moment of the day is that it is helpful to keep a development journal when working on an application.  It has been so meaningful to look back at the progress that we as a team have accomplished over the last few weeks. 

## Wednesday, January 25, 2023
I created a unit test for our “Update a Room” function.  This was my first time developing a unit test, so it took some additional research to figure out the process.  Once I created the test, I changed a few values within my unit test to confirm that the unit test was working as expected and that the unit test checks the correct elements. 

I also completed another feature to add functionality to our “Room View” page.  I developed a conditional statement so that the “Delete Furniture” button only appears if the page being viewed belongs to the logged-in user.  

The ah-ha moment of the day was that if you are unsure whether your unit test is correct, it is helpful to change a few values in the test to see if it still passes.  

## Tuesday, January 24, 2023
I worked on a feature on the "Room View" page so that the “Dashboard,” “Add Furniture,” and “Update Room” buttons are visible only when the room is viewed by the creator of the room.  If the room does not belong to the logged-in user, then those buttons are not visible.  After a full day on this feature, I was finally able to get it working!  I fixed the issue by simplifying my code.  Instead of having a separate function to check whether the username of the logged-in user matches the username of the room creator, I completed that conditional check directly in the JSX code.

The ah-ha moment of the day was that sometimes if you run into a persistent issue, it is helpful to ask a team member for assistance.  Since I worked on this issue for a few days, I asked Hanna if I could talk through the bug with her, and we were ultimately able to fix the problem together with the assistance of an SEIR.  

## Monday, January 23, 2023
Today I worked alone on a feature to display a card on the “Room View” page.   The card will only be displayed if the room belongs to the logged-in user.  I set up the logic for this feature but noticed that the card would only show the second time the page renders.  This led me to believe that the issue was related to the state of my variables.  I worked with a SEIR to further discuss this issue and continued to work on the suggestions they provided.

The ah-ha moment of the day is that it is important to be mindful of the order in which the functions are being called when developing in react.

## Friday, January 20, 2023
Today I worked on another feature on my own.  After a design discussion with my team, I updated the “Rooms List” page to display the data in card components instead of a table.  I also changed the search bar filter on the “Rooms List” page so that the search feature is no longer case-sensitive.

The ah-ha moment of the day was that it is possible to use .toLowerCase() on our filter so that you will get your search matches regardless of the text case.

## Thursday, January 19, 2023
Today I worked on another feature on my own.  I developed a form to create a new room.  For this feature, I decided to get the username associated with the logged-in user, so I could use it in the form submission.  This was challenging, but after some research, I learned how to fetch the username from the token.  This allowed me to automatically include the username in the form submission instead of prompting the user to submit their username in the form.  I also challenged myself with this feature creating my first form as a functional component.  My previous forms were class-based components, so it was great to further develop these skills.

The ah-ha moment of the day is that its possible to get the username for the logged-in user through a GET call to “/token.”

## Wednesday, January 18, 2023
Today I worked on a feature on my own.  After discussing the button options with my team, I added a delete button to our “Dashboard” page.  The delete button allows the user to delete existing rooms.

The ah-ha moment of the day was it is important to look at the documentation if you ever need further clarification on a specific topic.

## Tuesday, January 17, 2023
Today I worked with Missy to fix our Signup form. We had an existing Signup Form, but when we filled it out with data and clicked “Submit” there was a “401 (Unauthorized)” error in the console and the POST method failed.  We spent several hours on this feature today, but we were unable able to find a resolution to this issue.  Hanna and Abdoul worked to fix the “Dashboard” page so that it only shows the rooms associated with a specific user.  They were successful and were able to get this feature up and running. 

The ah-ha moment for the day is that it is important to follow the FastAPI Authentication Cookbook closely when developing our authentication. One of our main issues was resolved today by following the FastAPI Authentication Cookbook more closely.

## Monday, January 16, 2023
Today is MLK Day, so there was no class today.

## Friday, January 13, 2023
I worked on updating the "Dashboard" page so that the page displays the rooms associated with a specific user. Abdoul and I worked together on this feature. We initially tried to filter the rooms on the front end, but after consulting with Riley, we decided to add a new route and query to filter the rooms by the user instead.  

Our ah-ha moment for the day was that it is a better approach to filter the rooms on the backend rather than the front end.

## Thursday, January 12, 2023
Our team finally was able to get our Login form up and working! Hanna took the lead on figuring out how to get the Login Form working, after consulting with Riley. After consulting with my team on the design, I worked on adding a description to the Homepage of our project. I worked alone on this portion of the project.  

Our ah-ha moment for the day was that it is helpful to compare errors as a group. We tend to experience similar errors, so we are able to help each other through the errors.

## Wednesday, January 11, 2023
Our team worked to fix a few warning/error messages that we received in the console.  Abdoul was able to find a fix to a key error message that we found on our console. Also, Hanna worked on setting up the Homepage, the Navigation Bar, the Login Form, and the Sign-Up Form. For these, we simply got the styling setup without adding the functionality.

Our ah-ha moment for the day was it is helpful to work in smaller sections.  It is better to split up larger tasks into smaller manageable pieces.  

## Tuesday, January 10, 2023
As a team, we continued to work on the authentication process. We created a login form on the front end so that we could add in authentication, but we ran into an issue with this. We met with Riley and he gave us some guidance on the authentication process, instead of using a piecemeal approach to the issue, he recommended that we follow the authentication recipe book very closely. We ran into a few react errors, but we were able to fix them.

Our ah-ha moment for the day was it is helpful to stick with the authentication cookbook.

## Monday, January 9, 2023
Our team updated the Furniture model with an "ON DELETE CASCADE". Previously when we would try to delete a room with furniture in it, we would get an error message and were unable to delete the room.  Now that the "ON DELETE CASCADE" has been added to the furniture model, we can delete the rooms with furniture without any issues.  Abdoul was able to create this change for us.

Our ah-ha moment for the day was that it is helpful to look at documentation when working with a new framework.

## Friday, January 6, 2023
Our team updated the furniture routes, so that we can get furniture for a specific room.  I was driving for this portion of the pair programming. We also worked as a team for a significant part of today working on getting our authentication up and running.  

Our ah-ha moment was that we were able to figure out how to add a portion of our authentication (which was tricky for us).   

## Thursday, January 5, 2023
Today was my first day "driving" while peer programming.  Our team worked as a group to add a Furniture model with a GET and POST route.  We also added a GET one and a DELETE route for the rooms.  Our group also read our exploration on authentication, so that we can begin the process of adding authentication to our web application. We ran into a few issues when adding authentication, so we ultimately decided to wait until the lecture to continue the process of adding authentication.

Our ah-ha moment was we started noticing patterns in our errors, so I started writing down common errors so that we can reference them in the future.

## Wednesday, January 4, 2023
Today was our first day of coding for our project. Our group worked as a unit during the entire day and completed the coding as a team. We completed the setup portion of the project, including creating our Dockerfile and docker-compose.yaml file. We also set up our PostgreSQL database and developed the GET and POST methods for our Rooms endpoint. Although the FASTAPI instructional videos were extremely helpful, I found that coding through the FASTAPI as a group really helped formalize my knowledge.

Our ah-ha moment was that although learning a new web framework like FASTAPI can be challenging, it is helpful to pair program and work as a group.