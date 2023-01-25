from fastapi.testclient import TestClient
from queries.accounts import AccountsQueries
from main import app

client = TestClient(app=app)

class AccountsQueriesMock:
   def get_all_accounts(self):
      return []

def test_get_all_accounts():
   # Arrange
   app.dependency_overrides[AccountsQueries] = AccountsQueriesMock

   # Act
   res = client.get('/api/accounts')

   # Assert
   assert res.status_code == 200
   assert res.json() == {'accounts': []}

   # Cleanup
   app.dependency_overrides = {}
