from fastapi import APIRouter, Depends, Response, Request
from queries.accounts import Account, AccountIn, AccountOut, AccountsQueries, Error
from typing import Union, List, Optional
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel

router = APIRouter()

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

@router.get("/api/accounts", response_model=Union[List[AccountOut], Error], tags=["Accounts"])
def get(
    repo: AccountsQueries = Depends(),
):
    return repo.get()

@router.post("/api/accounts", response_model=AccountToken | HttpError, tags=["Accounts"])
async def create_account(account: AccountIn, request: Request, response: Response, repo: AccountsQueries = Depends(),
):
    hashed_password = authenticator.hash_password(account.hashed_password)
    account = repo.create(account, hashed_password)
    form = AccountForm(username=account.username, password=account.hashed_password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
