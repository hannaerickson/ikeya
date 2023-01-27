import json
from fastapi.testclient import TestClient
from queries.rooms import RoomRepository
from main import app
from models.models import RoomOut, RoomIn
from authenticator import authenticator


client = TestClient(app=app)


def get_current_account_data_mock():
    return {"username": "Abdoul"}


class RoomRepositoryMock:
    def create(self, room: RoomIn) -> RoomOut:
        room_dict = room.dict()
        return RoomOut(id=99, **room_dict)

    def get_all_rooms(self):
        return [
            RoomOut(id=1, name="room1", username="test_user1"),
            RoomOut(id=2, name="room2", username="test_user2"),
        ]

    def update(self, room_id: int, room: RoomIn) -> RoomOut:
        room_dict = room.dict()
        return RoomOut(
            id=1,
            name="Bedroom",
            description="A bedroom with a view.",
            picture_url="www.test.jpg",
            username="test",
        )


def test_create_room():
    app.dependency_overrides[RoomRepository] = RoomRepositoryMock
    room_body = {
        "name": "Test",
        "description": "Test",
        "picture_url": "test.jpg",
        "username": "test",
    }
    response = client.post("/api/rooms", json.dumps(room_body))
    assert response.status_code == 200
    assert response.json()["id"] == 99
    app.dependency_overrides = {}


def test_get_rooms():
    app.dependency_overrides[RoomRepository] = RoomRepositoryMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_mock
    response = client.get("/api/rooms")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "name": "room1",
            "description": None,
            "picture_url": None,
            "username": "test_user1",
        },
        {
            "id": 2,
            "name": "room2",
            "description": None,
            "picture_url": None,
            "username": "test_user2",
        },
    ]
    app.dependency_overrides = {}


def test_update_room():
    app.dependency_overrides[RoomRepository] = RoomRepositoryMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_mock
    room_body = {
        "name": "Test",
        "description": "Test",
        "picture_url": "test.jpg",
        "username": "test",
    }
    response = client.put("/api/rooms/1", json.dumps(room_body))
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == "Bedroom"
    assert response.json()["description"] == "A bedroom with a view."
    assert response.json()["picture_url"] == "www.test.jpg"
    assert response.json()["username"] == "test"
    app.dependency_overrides = {}
