from pydantic import BaseModel
from typing import Optional
from jwtdown_fastapi.authentication import Token


class HttpError(BaseModel):
    detail: str


class Error(BaseModel):
    message: str


# ACCOUNT MODELS
class Account(BaseModel):
    id: int
    username: str
    hashed_password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str


class AccountIn(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str


class AccountList(BaseModel):
    accounts: list[AccountOut]


class AccountToken(Token):
    account: AccountOut


class AccountForm(BaseModel):
    username: str
    password: str


# ROOM MODELS
class RoomIn(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    username: str


class RoomOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    username: str


# FURNITURE MODELS
class FurnitureIn(BaseModel):
    name: str
    picture_url: Optional[str]
    room_id: int


class FurnitureOut(BaseModel):
    id: int
    name: str
    picture_url: Optional[str]
    room_id: int
