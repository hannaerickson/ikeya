from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str

class UserOut(UserIn):
    id: int


class UserRepository:
    def get_all_users(self) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, first_name, last_name, username, password
                        FROM users
                        ORDER by id;
                        """
                    )
                    result = []
                    for record in db:
                        user = UserOut(
                            first_name=record[0],
                            last_name=record[1],
                            username=record[2],
                            password=record[3],
                            id=record[4],
                        )
                        result.append(user)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def create(self, user: UserIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (first_name, last_name, username, password)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [user.first_name, user.last_name, user.username, user.password]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id, user)
        except Exception:
            return {"message": "User could not be created"}
    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        print(old_data)
        return UserOut(id=id, **old_data)
