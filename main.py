from fastapi import FastAPI
from pydantic import BaseMode
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/", StaticFiles(directory="static", html=True), name="static")