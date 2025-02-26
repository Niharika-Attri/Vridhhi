from fastapi import FastAPI
from pydantic import BaseModel
from enum import Enum

class PlantSpecies(str, Enum):
    sunflower = "Sunflower"
    rose = "Rose"
    aloe_vera = "Aloe Vera"
    hibiscus = "Hibiscus"
    tulsi = "Tulsi"
    methi = "Methi"

class User(BaseModel):
    name: str
    email: str
    password: str
    bio: str | None = None

app = FastAPI()

@app.get('/')
async def root():
    return{"message": "hello people"}

@app.get('/signup/{plants}')
async def signupUser(user: User | None = None, plants: PlantSpecies | None = None, token: str | None = None):
    if plants is PlantSpecies.tulsi:
        return user

@app.post('/login')
async def loginUser():
    return{
        "name":"niharika",
        "email":"niharika@gmail.com",
        "password":"niharika123",
        "plants":["tulsi", "neem", "rose"]
    }

@app.get('/plant/{id}')
async def get_Specific_Plant(id: int):
    return{
        "plant_id": id
    }