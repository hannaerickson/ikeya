from fastapi import FastAPI
from routers import rooms, accounts, furniture
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(authenticator.router)
app.include_router(rooms.router)
app.include_router(accounts.router)
app.include_router(furniture.router)

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
