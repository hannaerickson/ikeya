from fastapi.testclient import TestClient
from queries.accounts import AccountsQueries
from main import app

client = TestClient(app=app)


class AccountsQueriesMock:
    def get_all_accounts(self):
        return []


def test_get_all_accounts():
    app.dependency_overrides[AccountsQueries] = AccountsQueriesMock
    res = client.get("/api/accounts")
    assert res.status_code == 200
    assert res.json() == {"accounts": []}
    app.dependency_overrides = {}


def test_create_account():
    client = TestClient(app)
    response = client.post(
        "/api/accounts",
        json={
            "username": "testuser",
            "password": "testpassword",
            "first_name": "Test",
            "last_name": "User",
        },
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "account" in response.json()
    assert response.json()["account"]["username"] == "testuser"
