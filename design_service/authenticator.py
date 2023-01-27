import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountsQueries
from models.models import Account, AccountOut


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountsQueries,
    ):
        return accounts.get_user_by_id(username)

    def get_account_getter(
        self,
        accounts: AccountsQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: Account):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
