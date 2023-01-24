import json
from fastapi import Depends
from fastapi.testclient import TestClient
from queries.rooms import RoomRepository
from queries.accounts import AccountsQueries
from main import app
from models.models import RoomOut, RoomIn, AccountOut
from authenticator import MyAuthenticator


client = TestClient(app=app)

class MyAuthenticatorMock(MyAuthenticator):
    async def get_account_data(self,username:str, accounts: AccountsQueries):
        return AccountOut(id=1, username="test")
    def get_account_getter(
        self,
        accounts: AccountsQueries = Depends(),
    ):
        return accounts
    def get_hashed_password(self, account: AccountOut):
        return "password"






class RoomRepositoryMock:
    def create(self, room: RoomIn) -> RoomOut:
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
    app.dependency_overrides[MyAuthenticator] = MyAuthenticatorMock
    print(app.dependency_overrides[MyAuthenticator])
    response = client.get("/api/rooms")
    assert response.status_code == 200
    assert response.json() == {"rooms": []}
    app.dependency_overrides = {}
