# Journals


 ## January 5th:
Created some design service routes and queries for our project. Had a bit of a road bump with our fastapi though, as we forgot to add some variables created within other queries to other files, as they are connected by way of a foreign key.

### January 6th:
Were making authentication tokens for our login and logout routes, which was a real pain in the butt. After some clarification though, we were able to make a breakthrough and get them mostly working. Just have to iron out a few kinks and we'll be good to go.

#### January 9th:
Fixed that pesky delete function today. Just had to add ON DELETE CASCADE to our table file, as we had a foreign key which was affecting our delete function.
