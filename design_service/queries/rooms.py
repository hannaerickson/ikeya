from typing import Optional, List, Union
from queries.pool import pool
from models.models import Error, RoomIn, RoomOut


class RoomRepository:
    def get_all_rooms(self) -> Union[List[RoomOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, description, picture_url, username
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
                            username=record[4],
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
                        SELECT id, name, description, picture_url, username
                        FROM rooms
                        WHERE id = %s;
                        """,
                        [room_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_room_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that room"}

    def get_current_user_rooms(self, username: str) -> Optional[RoomOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, description, picture_url, username
                        FROM rooms;
                        WHERE username = %s;
                        """,
                        [username],
                    )
                    record = result.fetchall()
                    if record is None:
                        return None
                    return self.record_to_room_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get rooms for that user"}

    def create(self, room: RoomIn) -> RoomOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO rooms (name, description, picture_url, username)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            room.name,
                            room.description,
                            room.picture_url,
                            room.username,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.room_in_to_out(id, room)
        except Exception:
            return {"message": "Could not create room"}

    def update(self, room_id: int, room: RoomIn) -> Union[RoomOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE rooms
                    SET name = %s
                        , description = %s
                        , picture_url = %s
                    WHERE id = %s
                    """,
                    [room.name, room.description, room.picture_url, room_id],
                )
                return self.room_in_to_out(room_id, room)

    def delete(self, room_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM rooms
                        WHERE id = %s;
                        """,
                        [room_id],
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
            username=record[4],
        )
