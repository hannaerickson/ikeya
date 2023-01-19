import json
from fastapi.testclient import TestClient
from queries.rooms import RoomRepository
from main import app
from models.models import RoomOut, RoomIn


client = TestClient(app=app)

# def get_current_account_data_mock():
#     {
#         "username": "Doul",
#         "account"
#     }





class RoomRepositoryMock:
    def create_room(self, room: RoomIn) -> RoomOut:
        room_dict = room.dict()
        return RoomOut(id= 99, **room_dict)

    def get_all_rooms(self):
        return []


def test_create_room():
    app.dependency_overrides[RoomRepository] = RoomRepositoryMock
    room_body = {"name": "Test", "description": "Test", "picture_url": "test.jpg", "username": "test"}
    response = client.post("/api/rooms", json.dumps(room_body))
    assert response.status_code == 200
    assert response.json()["id"] == 99
    app.dependency_overrides = {}


def test_get_rooms():
    app.dependency_overrides[RoomRepository] = RoomRepositoryMock
    response = client.get("/api/rooms")
    assert response.status_code == 200
    assert response.json() == {"rooms": []}
    app.dependency_overrides = {}
