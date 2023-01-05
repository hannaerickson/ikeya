from fastapi import APIRouter, Depends, Response
from queries.rooms import RoomIn, RoomOut, RoomRepository, Error
from typing import Union, List, Optional

router = APIRouter()

@router.get("/api/rooms", response_model=Union[List[RoomOut], Error], tags=["Rooms"])
def get_all_rooms(
    repo: RoomRepository = Depends(),
):
    return repo.get_all_rooms()

@router.post("/api/rooms", response_model=Union[RoomOut, Error], tags=["Rooms"])
def create_room(room: RoomIn, response: Response, repo: RoomRepository = Depends()):
    if room is None:
        response.status_code = 400
    return repo.create(room)

@router.get("/api/rooms/{room_id}", response_model=Optional[RoomOut], tags=["Rooms"])
def get_one_room(
    room_id: int,
    response: Response,
    repo: RoomRepository = Depends(),
) -> RoomOut:
    room = repo.get_one_room(room_id)
    if room is None:
        response.status_code = 404
    return room

@router.delete("/api/rooms/{room_id}", response_model=bool, tags=["Rooms"])
def delete_room(
    room_id: int,
    repo: RoomRepository = Depends(),
) -> bool:
    return repo.delete(room_id)
