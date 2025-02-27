import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

collection = None

# Initialize database connection
async def init_db():
    global collection
    try:
        client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
        await client.admin.command("ping")  # Force an async ping to test the connection

        print("Connection to the database established")

        database = client.plants  # Updated to plants
        collection = database.get_collection("plant_collection")  # Updated to plant_collection
        return collection

    except Exception as e:
        print("Error connecting to the database:", e)
        return None

# Helper to convert MongoDB object to dictionary
def plant_helper(plant) -> dict:
    return {
        "id": str(plant["_id"]),
        "name": plant["name"],
        "description": plant["description"],
        "category": plant["category"],
        "date_planted": plant["date_planted"],
        "present_height": plant["present_height"],
        "initial_height": plant["initial_height"]
    }

# Get all plants
async def get_all_plants():
    plants = []
    async for plant in collection.find():
        plants.append(plant_helper(plant))
    return plants

# Get a specific plant by ID
async def get_plant(id: str) -> dict:
    plant = await collection.find_one({"_id": ObjectId(id)})
    if plant:
        return plant_helper(plant)
    return None

# Add a new plant
async def add_plant(plant_data: dict) -> dict:
    plant = await collection.insert_one(plant_data)
    new_plant = await collection.find_one({"_id": plant.inserted_id})
    return plant_helper(new_plant)

# Get a plant by name
async def get_plant_byname(name: str) -> dict:
    plant = await collection.find_one({"name": name})
    if plant:
        return plant_helper(plant)
    return None

# Delete a plant by ID
async def delete_plant(id: str) -> dict:
    deleted_plant = await collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_plant:
        return plant_helper(deleted_plant)
    return None

# Update a plant by ID
async def update_plant(id: str, plant_data: dict) -> dict: 
    updated_plant = await collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": plant_data},  
        return_document=True
    )
    if updated_plant:
        return plant_helper(updated_plant)
    return None
