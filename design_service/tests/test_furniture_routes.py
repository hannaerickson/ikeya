from fastapi.testclient import TestClient
from queries.furniture import FurnitureRepository
from main import app
from authenticator import authenticator

client = TestClient(app=app)

class FurnitureQueriesMock:
    def get_all_furniture(self):
        return []

def test_get_furniture():
#Arrange
    # app.dependency_overrides[FurnitureQueries] = FurnitureQueriesMock()
    app.dependency_overrides[FurnitureRepository] = FurnitureQueriesMock

 #Act
    res = client.get('/api/rooms/{room_id}/furniture/')
 
 #Assert
    assert res.status_code == 200
    assert res.json() == { 'furniture': [] }