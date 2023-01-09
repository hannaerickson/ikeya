from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class RoomIn(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    account_id: int

class RoomOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    account_id: int

class RoomRepository:
    def get_all_rooms(self) -> Union[List[RoomOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, description, picture_url, account_id
                        FROM rooms
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        room = RoomOut(
                            id=record[0],
                            name=record[1],
                            description=record[2],
                            picture_url=record[3],
                            account_id=record[4],
                        )
                        result.append(room)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all rooms"}

    def get_one_room(self, room_id: int) -> Optional[RoomOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, description, picture_url, account_id
                        FROM rooms
                        WHERE id = %s;
                        """,
                        [room_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_room_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that room"}

    def create(self, room: RoomIn) -> RoomOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO rooms (name, description, picture_url, account_id)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [room.name, room.description, room.picture_url, room.account_id]
                    )
                    id = result.fetchone()[0]
                    return self.room_in_to_out(id, room)
        except Exception:
            return {"message": "Could not create room"}

    def delete(self, room_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM rooms
                        WHERE id = %s;
                        """,
                        [room_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def room_in_to_out(self, id: int, room: RoomIn):
        old_data = room.dict()
        print(old_data)
        return RoomOut(id=id, **old_data)

    def record_to_room_out(self, record):
        return RoomOut(
            id=record[0],
            name=record[1],
            description=record[2],
            picture_url=record[3],
            account_id=record[4],
        )
