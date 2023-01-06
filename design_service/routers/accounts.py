from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from typing import Union, List
from queries.accounts import AccountIn, AccountOut, AccountsQueries
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

@router.get("/api/accounts", response_model=Union[List[AccountOut], HttpError])
def get(
    repo: AccountsQueries = Depends()
):
    return repo.get()

@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountsQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
