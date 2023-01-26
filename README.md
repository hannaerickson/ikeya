IKEYA

## Team Members

- Hanna Erickson
- Missy Pompeo
- Abdoul Nayete
- Tyler Byrd

## Design

- API Design![API](API_DESIGN.md)
- GHI![Wireframe](GHI_WIREFRAME.png)

## Intended market

The IKEYA application targets the mainstream consumer who is seeking home decor inspiration. IKEYA users interested in designing a room can upload furniture inspiration and ideas that meet their interior design needs or browse the rooms of other users.

## The MVP of this project includes the following functionality:

- User registration and login:
  Users can create an account and log in to the application. This allows for personalized room and furniture management.
- NavBar:
  A navigation bar is present on all pages, providing links to view all rooms, the user's personal rooms, and the ability to log out when the user is logged in. If the user is not logged in, the navbar shows links for the main page, login, and sign up.
- Modals:
  All forms within the application are displayed as modals for a better user experience. This includes confirmation before a user deletes a room or a piece of furniture.
- Room management:
  Once logged in, users can create, view, update, and delete rooms within the application. This includes the ability to add a name, description, and picture URL for each room.
- Furniture management:
  Users can add, view, and delete furniture items within a room. Each furniture item can have a name, description, and picture URL.
- Room visualization:
  Users can view a visual representation of their room, including the furniture items within it.
- User dashboard:
  Users can view their created rooms, update room information, add new rooms, and also add furniture to rooms they have created.
- Search functionality:
  Users can search for rooms other users have created by name.

These features provide a complete solution for users to create and manage their virtual rooms and furniture items. The application is designed to be user-friendly, with an intuitive interface and easy navigation.

## Stretch Goal Functionality

- Adding functionality to the 'update room' feature so that the unique room ID is passed with the click handler. Currently the update form features a drop-down to select a room.
- Similar to the above feature, functionality for the update form to auto-generate the current room data passed with the click handler. Currently the form renders blank, and if a piece of information is not provided it will update that field to be blank. Ideally the current name, description and image for the room would generate in these fields so that the user can decide what to update while all other fields remain intact.
- The ability to link another URL to individual furniture pieces that lead to an available site to purchase that item. Details regarding price could also be displayed on the furniture card beside the button to navigate to the link.
- Dashboard could display the furniture items inside a room as a carousel of images as opposed to the static image it has now. If no furniture exists in a room, the static room image would replace the carousel. Either way the static room image appears on that specific room view.

## Set up

To access the application on your local computer, please follow these steps:

1. Clone the repository: https://gitlab.com/team-ikeya/ikeya.git.
2. CD into the project directory.
3. Run docker volume create postgres-data.
4. Run docker volume create jwtdown-db-data.
5. If you are a PC user, run docker compose build. If you are a Mac user, run DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build.
6. Run docker compose up.
7. Enjoy the application.

## Test

- design_service/tests/test_room_routes / test_create_room / Abdoul Nayete
- design_service/tests/test_room_routes / test_get_rooms / Abdoul Nayete
- design_service/tests/test_room_routes / test_update_room / Tyler Byrd
- design_service/tests/test_furniture_routes / test_create_furniture / Hanna Erickson
- design_service/tests/test_account_routes / test_get_all_accounts / Hanna Erickson
