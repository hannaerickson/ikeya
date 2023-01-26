IKEYA

## Team Members
* Hanna Erickson
* Missy Pompeo
* Abdoul Nayete
* Tyler Byrd

## Design
* API Design![API](API_DESIGN.md)
* GHI![Wireframe](GHI_WIREFRAME.png)

## Intended market
The IKEYA application targets the mainstream consumer who is seeking home decor inspiration.  IKEYA users interested in designing a room can upload furniture inspiration and ideas that meet their interior design needs or browse the rooms of other users.

## Stretch Goal Functionality
* Adding functionality to the 'update room' feature so that the unique room ID is passed with the click handler. Currently the update form features a drop-down to select a room.
* Similar to the above feature, functionality for the update form to auto-generate the current room data passed with the click handler. Currently the form renders blank, and if a piece of information is not provided it will update that field to be blank. Ideally the current name, description and image for the room would generate in these fields so that the user can deicde what to update while all other fields remain intact.
* The ability to link another URL to individual furniture pieces that lead to an available site to purchase that item. Details regarding price could also be displayed on the furniture card beside the button to navigate to the link.
* Dashboard could display the furniture items inside a room as a carosel of images as opposed to the static image it has now. If no furniture exists in a room, the static room image would replace the carosel. Either way the static room image appears on that specific room view.

## Set up
To access the application on your local computer, please follow these steps:
1. Clone the repository: https://gitlab.com/team-ikeya/ikeya.git.
2. CD into the project directory.
2. Run docker volume create postgres-data.
3. Run docker volume create jwtdown-db-data.
4. If you are a PC user, run docker compose build.  If you are a Mac user, run DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build.
5. Run docker compose up.
6. Enjoy the application.

## Test
* design_service/tests/test_room_routes / test_create_room / Abdoul Nayete
* design_service/tests/test_room_routes / test_get_rooms / Abdoul Nayete
* design_service/tests/test_room_routes / test_update_room / Tyler Byrd
* design_service/tests/test_furniture_routes / test_create_furniture / Hanna Erickson
* design_service/tests/test_account_routes / test_get_all_accounts / Hanna Erickson
