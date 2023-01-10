import os
from typing import Union, List
from pydantic import BaseModel
<<<<<<< HEAD
from typing import Optional, List, Union
from queries.pool import pool
=======

from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

>>>>>>> mel


class Error(BaseModel):
    message: str


class Account(BaseModel):
    id: int
    username: str
    hashed_password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str


class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str


class AccountsQueries:
<<<<<<< HEAD
    # def get_all(self) -> Union[List[AccountOut], Error]:
    #     # connect the database
    #     with pool.connection() as conn:
    #         # get a cursor (something to run SQL with)
    #         with conn.cursor() as db:
    #             # Run our SELECT statement
    #             result = db.execute(
    #                 """
    #                 SELECT id
    #                     , username
    #                     , hashed_password
    #                     , first_name
    #                     , last_name
    #                 FROM accounts
    #                 """,
    #             )
    #             result = []
    #             for record in db:
    #                 account = AccountOut(
    #                     id=record[0],
    #                     username=record[1],
    #                     hashed_password=record[2],
    #                     first_name=record[3],
    #                     last_name=record[4],
    #                 )
    #                 result.append(account)
    #             return result

    def get(self, username: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                         , username
                         , hashed_password
                         , first_name
                         , last_name
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
=======
    def get(self, username: str) -> Union[List[Account], Error]:
        # connect the database
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , hashed_password
                            , first_name
                            , last_name
                        FROM accounts
                        WHERE username = %s;
                        """,
                        [username],
                    )
>>>>>>> mel
                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    first_name=record[3],
                    last_name=record[4],
                )
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    INSERT INTO accounts (username, hashed_password, first_name, last_name)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.username,
                        hashed_password,
                        account.first_name,
                        account.last_name,
                    ],
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    username=account.username,
                    hashed_password=hashed_password,
                    first_name=account.first_name,
                    last_name=account.last_name,
                )


# class UserIn(BaseModel):
#     first_name: str
#     last_name: str
#     username: str
#     hashed_password: str
# class UserOut(BaseModel):
#     id: int
#     first_name: str
#     last_name: str
#     username: str
#     hashed_password: str
# class UserRepository:
#     def get(self) -> Union[List[UserOut], Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         SELECT id, first_name, last_name, username, hashed_password
#                         FROM users
#                         ORDER BY id;
#                         """
#                     )
#                     result = []
#                     for record in db:
#                         user = UserOut(
#                             id=record[0],
#                             first_name=record[1],
#                             last_name=record[2],
#                             username=record[3],
#                             hashed_password=record[4],
#                         )
#                         result.append(user)
#                     return result
#         except Exception as e:
#             print(e)
#             return {"message": "Could not get all users"}
#     def create(self, user: UserIn) -> UserOut:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         INSERT INTO users (first_name, last_name, username, hashed_password)
#                         VALUES (%s, %s, %s, %s)
#                         RETURNING id;
#                         """,
#                         [user.first_name, user.last_name, user.username, user.hashed_password]
#                     )
#                     id = result.fetchone()[0]
#                     return self.user_in_to_out(id, user)
#         except Exception:
#             return {"message": "User could not be created"}
#     def user_in_to_out(self, id: int, user: UserIn):
#         old_data = user.dict()
#         print(old_data)
#         return UserOut(id=id, **old_data)
