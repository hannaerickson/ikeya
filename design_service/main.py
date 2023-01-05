from fastapi import FastAPI
from routers import rooms, users

app = FastAPI()
app.include_router(rooms.router)
app.include_router(users.router)
