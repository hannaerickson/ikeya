from queries.pool import pool
from models.models import Account, AccountIn


class AccountsQueries:
    def get_all_accounts(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id
                         , username
                         , hashed_password
                         , first_name
                         , last_name
                    FROM accounts
                    """
                )
                results = []
                for row in cur.fetchall():
                    account = {}
                    for i, column in enumerate(cur.description):
                        account[column.name] = row[i]
                    results.append(account)
                return results

    def get_user_by_id(self, username: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                         , username
                         , hashed_password
                         , first_name
                         , last_name
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )

                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    first_name=record[3],
                    last_name=record[4],
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts (username, hashed_password, first_name, last_name)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.username,
                        hashed_password,
                        account.first_name,
                        account.last_name,
                    ],
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    username=account.username,
                    hashed_password=hashed_password,
                    first_name=account.first_name,
                    last_name=account.last_name,
                )
