from fastapi import APIRouter, Depends, Response
from queries.rooms import RoomIn, RoomOut, RoomRepository, Error
from typing import Union, List, Optional
from authenticator import authenticator


router = APIRouter()


@router.get(
    "/api/rooms", response_model=Union[List[RoomOut], Error], tags=["Rooms"]
)
def get_all_rooms(
    repo: RoomRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_rooms()

<<<<<<< HEAD
@router.get("/api/rooms/{room_id}", response_model=Optional[RoomOut], tags=["Rooms"])
=======

@router.post(
    "/api/rooms", response_model=Union[RoomOut, Error], tags=["Rooms"]
)
def create_room(
    room: RoomIn,
    response: Response,
    repo: RoomRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if room is None:
        response.status_code = 400
    return repo.create(room)


@router.get(
    "/api/rooms/{room_id}", response_model=Optional[RoomOut], tags=["Rooms"]
)
>>>>>>> 45cb7cadba1b5851d9067d632d6e5ad39be71e12
def get_one_room(
    room_id: int,
    response: Response,
    repo: RoomRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> RoomOut:
    room = repo.get_one_room(room_id)
    if room is None:
        response.status_code = 404
    return room

<<<<<<< HEAD
@router.post("/api/rooms", response_model=Union[RoomOut, Error], tags=["Rooms"])
def create_room(room: RoomIn, response: Response, repo: RoomRepository = Depends()):
    if room is None:
        response.status_code = 400
    return repo.create(room)

@router.put("/api/rooms/{room_id}", response_model=Union[RoomOut, Error], tags=["Rooms"])
def update_room(
    room_id: int,
    room: RoomIn,
    repo: RoomRepository = Depends(),
) -> Union[RoomOut, Error]:
    return repo.update(room_id, room)
=======
>>>>>>> 45cb7cadba1b5851d9067d632d6e5ad39be71e12

@router.delete("/api/rooms/{room_id}", response_model=bool, tags=["Rooms"])
def delete_room(
    room_id: int,
    repo: RoomRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(room_id)
