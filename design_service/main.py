from fastapi import FastAPI
from routers import rooms

app = FastAPI()
app.include_router(rooms.router)
