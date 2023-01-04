from fastapi import APIRouter, Depends, Response
from queries.rooms import RoomIn, RoomOut, RoomRepository, Error
from typing import Union, List, Optional

router = APIRouter()

@router.get("/api/rooms", response_model=Union[List[RoomOut], Error])
def get_all_rooms(
    repo: RoomRepository = Depends(),
):
    return repo.get_all_rooms()

@router.post("/api/rooms", response_model=Union[RoomOut, Error])
def create_room(room: RoomIn, response: Response, repo: RoomRepository = Depends()):
    if room is None:
        response.status_code = 400
    return repo.create(room)
