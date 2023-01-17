from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    HTTPException,
    status,
)
from models.models import (
    AccountOut,
    AccountIn,
    AccountToken,
    HttpError,
    AccountForm,
    AccountList,
)
from queries.accounts import AccountsQueries
from authenticator import authenticator


router = APIRouter()


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


@router.get("/api/accounts", response_model=AccountList, tags=["Accounts"])
def list_accounts(
    repo: AccountsQueries = Depends(),
):
    return AccountList(accounts=repo.get_all_accounts())


@router.get(
    "/api/accounts/{username}", response_model=AccountOut, tags=["Accounts"]
)
def show_one_account(
    username: str, response: Response, repo: AccountsQueries = Depends()
):  # dependency injection, will make sense in unit testing
    account = repo.get_user_by_id(username)
    if account is None:
        # set a 404
        response.status_code = 404
    return account


@router.post(
    "/api/accounts", response_model=AccountToken | HttpError, tags=["Accounts"]
)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountsQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account)
