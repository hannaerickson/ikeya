from fastapi import APIRouter, Depends, Response
from queries.furniture import FurnitureIn, FurnitureOut, FurnitureRepository, Error
from typing import Union, List, Optional

router = APIRouter()

@router.get("/api/rooms/{room_id}/furniture/", response_model=Union[List[FurnitureOut], Error], tags=["Furniture"])
def get_all_furniture(
    room_id: int,
    repo: FurnitureRepository = Depends(),
):
    return repo.get_all_furniture(room_id)

@router.post("/api/furniture", response_model=Union[FurnitureOut, Error], tags=["Furniture"])
def create_furniture(furniture: FurnitureIn, response: Response, repo: FurnitureRepository = Depends()):
    if furniture is None:
        response.status_code = 400
    return repo.create(furniture)