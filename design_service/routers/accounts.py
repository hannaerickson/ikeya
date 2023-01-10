from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    HTTPException,
    status,
)
from typing import Union, List
from queries.accounts import AccountIn, AccountOut, AccountsQueries
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountsQueries,
)



class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


<<<<<<< HEAD
@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
=======
router = APIRouter()

>>>>>>> mel


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountsQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
<<<<<<< HEAD
    try:
        account = accounts.create(info, hashed_password)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
=======
    account = repo.create(info, hashed_password)
>>>>>>> mel
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())
