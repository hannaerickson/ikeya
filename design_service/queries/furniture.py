from typing import List, Union
from queries.pool import pool
from models.models import Error, FurnitureIn, FurnitureOut


class FurnitureRepository:
    def get_all_furniture(self, room_id) -> Union[List[FurnitureOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name, picture_url, room_id
                    FROM furniture
                    WHERE room_id = %s
                    ORDER BY id;
                    """,
                    [room_id],
                )
                result = []
                for record in db:
                    furniture = FurnitureOut(
                        id=record[0],
                        name=record[1],
                        picture_url=record[2],
                        room_id=record[3],
                    )
                    result.append(furniture)
                return result

    def create(self, furniture: FurnitureIn) -> FurnitureOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO furniture (name, picture_url, room_id)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        furniture.name,
                        furniture.picture_url,
                        furniture.room_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.furniture_in_to_out(id, furniture)

    def delete(self, furniture_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM furniture
                    WHERE id = %s;
                    """,
                    [furniture_id],
                )
                return True

    def furniture_in_to_out(self, id: int, furniture: FurnitureIn):
        old_data = furniture.dict()
        return FurnitureOut(id=id, **old_data)
