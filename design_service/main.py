from fastapi import FastAPI
from routers import rooms, accounts, furniture
from authenticator import authenticator

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(rooms.router)
app.include_router(accounts.router)
app.include_router(furniture.router)
