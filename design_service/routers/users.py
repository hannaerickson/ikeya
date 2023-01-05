from fastapi import APIRouter, Depends, Response
from queries.users import UserIn, UserOut, UserRepository, Error
from typing import Union, List, Optional

router = APIRouter()

@router.get("/api/users", response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserRepository = Depends(),
):
    return repo.get_all_users()

@router.post("/api/users", response_model=Union[UserOut, Error])
def create_user(user: UserIn, response: Response, repo: UserRepository = Depends()):
    if user is None:
        response.status_code = 400
    return repo.create(user)
