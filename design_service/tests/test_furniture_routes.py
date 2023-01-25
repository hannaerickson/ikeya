from fastapi.testclient import TestClient
from queries.furniture import FurnitureRepository
from models.models import FurnitureIn, FurnitureOut
from main import app
import json
from authenticator import authenticator

client = TestClient(app=app)

def get_current_account_data_mock():
    return {"username": "Hmae221"}

class FurnitureRepositoryMock:
    def create(self, furniture: FurnitureIn) -> FurnitureOut:
        furniture_dict = furniture.dict()
        return FurnitureOut(id=2, **furniture_dict)

def test_create_furniture():
    app.dependency_overrides[FurnitureRepository] = FurnitureRepositoryMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    furniture_body = {"name": "Test", "picture_url": "test.jpg", "room_id": 1,}
    response = client.post('/api/furniture', json.dumps(furniture_body))
    assert response.status_code == 200
    assert response.json()["id"] == 2
    app.dependency_overrides = {}
