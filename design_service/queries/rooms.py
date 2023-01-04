from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class RoomIn(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]

class RoomOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    picture_url: Optional[str]

class RoomRepository:
    def get_all_rooms(self) -> Union[List[RoomOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, description, picture_url
                        FROM rooms
                        ORDER BY name;
                        """
                    )
                    result = []
                    for record in db:
                        room = RoomOut(
                            id=record[0],
                            name=record[1],
                            description=record[2],
                            picture_url=record[3],
                        )
                        result.append(room)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all rooms"}
