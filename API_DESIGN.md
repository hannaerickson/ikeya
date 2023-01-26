API Design

## Rooms ##
Methods: GET, POST, GET, DELETE, PUT
Paths: /api/rooms, /api/rooms/{room_id}, /api/rooms/me

Endpoint paths to make a fetch for a list of all rooms, a single room by passing an ID, to create a new room instance, to delete a room, or to update a room. Final path would produce a list of all rooms specific to the logged in user.

Input: {
  "name": str,
  "description": str,
  "picture_url": str,
  "username": str
}

Output: [{
  "id": int,
  "name": str,
  "description": str,
  "picture_url": str,
  "username": str
},]

## Furniture ##
Methods: GET, POST, DELETE
Paths: /api/rooms/{room_id}/furniture/, /api/furniture, /api/furniture/{furniture_id}

Endpoint paths to make a fetch for all furniture associated with a provided room ID, a path to create a new furniture instance, or to delete a piece of furniture by the ID of that furniture item.

Input: {
    "name": str,
    "picture_url": str,
    "room_id": int
}

Output: [{
    "id": int,
    "name": str,
    "picture_url": str,
    "room_id": int
},]

## Accounts ##
Methods: GET, POST, GET
Paths: /api/accounts, /api/accounts/{username}

Endpoint paths to make a fetch for all user accounts, to show one specific user based on their username, or to create an account.

Input: {
    "username": str,
    "password": str,
    "first_name": str,
    "last_name": str
}

Output: {
    "accounts": [
        {
            "id": int,
            "username": str,
            "first_name": str,
            "last_name": str
        },
    ]}

## Authentication ##
Methods: GET, POST, DELETE
Path: /token

Endpoint paths for user login, logout, and token fetching.

Input: {
    "username": str,
    "password": str
}

Output: {
    "access_token": str,
    "token_type": "Bearer",
    "account": {
        "id": int,
        "username": str,
        "first_name": str,
        "last_name": str
    }
}
