from fastapi import APIRouter, Depends, Response
from queries.rooms import RoomIn, RoomOut, RoomRepository, Error
from typing import Union, List, Optional
from authenticator import authenticator

router = APIRouter()


@router.get(
    "/api/rooms", response_model=Union[List[RoomOut], Error], tags=["Rooms"]
)
def get_all_rooms(
    repo: RoomRepository = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_rooms()


@router.post(
    "/api/rooms", response_model=Union[RoomOut, Error], tags=["Rooms"]
)
def create_room(
    room: RoomIn,
    response: Response,
    repo: RoomRepository = Depends(authenticator.get_current_account_data),
):
    if room is None:
        response.status_code = 400
    return repo.create(room)


@router.get(
    "/api/rooms/{room_id}", response_model=Optional[RoomOut], tags=["Rooms"]
)
def get_one_room(
    room_id: int,
    response: Response,
    repo: RoomRepository = Depends(authenticator.get_current_account_data),
) -> RoomOut:
    room = repo.get_one_room(room_id)
    if room is None:
        response.status_code = 404
    return room


@router.delete("/api/rooms/{room_id}", response_model=bool, tags=["Rooms"])
def delete_room(
    room_id: int,
    repo: RoomRepository = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(room_id)
