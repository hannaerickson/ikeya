import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserIn, UserOut, UserRepository

class UserAuthenticator(Authenticator):
    async def get_user_data(
        self,
        username: str,
        users: UserRepository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return users.get(username)

    def get_user_getter(
        self,
        users: UserRepository = Depends(),
    ):
        # Return the accounts. That's it.
        return users

    def get_hashed_password(self, user: UserOut):
        # Return the encrypted password value from your
        # account object
        return user.password

    def get_user_data_for_cookie(self, user: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UserOut(**user.dict())


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
