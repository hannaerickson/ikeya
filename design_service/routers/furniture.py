from fastapi import APIRouter, Depends, Response
from queries.furniture import (
    FurnitureIn,
    FurnitureOut,
    FurnitureRepository,
    Error,
)
from typing import Union, List, Optional
from authenticator import authenticator

router = APIRouter()


@router.get(
    "/api/rooms/{room_id}/furniture/",
    response_model=Union[List[FurnitureOut], Error],
    tags=["Furniture"],
)
def get_all_furniture(
    room_id: int,
    repo: FurnitureRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_furniture(room_id)


@router.post(
    "/api/furniture",
    response_model=Union[FurnitureOut, Error],
    tags=["Furniture"],
)
def create_furniture(
    furniture: FurnitureIn,
    response: Response,
    repo: FurnitureRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if furniture is None:
        response.status_code = 400
    return repo.create(furniture)


@router.delete(
    "/api/furniture/{furniture_id}", response_model=bool, tags=["Furniture"]
)
def delete_furniture(
    furniture_id: int,
    repo: FurnitureRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(furniture_id)
