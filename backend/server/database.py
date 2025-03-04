import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

collection = None

# Initialize database connection
# Initialize database connection for both plants and users
async def init_db():
    global plant_collection, user_collection  # Separate collections for plants and users
    try:
        client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
        await client.admin.command("ping")  # Force an async ping to test the connection
        print("Connection to the database established")

        database = client.plants  # Using the same database, but different collections
        
        # Separate collections
        plant_collection = database.get_collection("plant_collection")
        user_collection = database.get_collection("user_collection")
        return plant_collection, user_collection

    except Exception as e:
        print("Error connecting to the database:", e)
        return None, None

# Helper to convert MongoDB user object to dictionary
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"]
    }


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
    async for plant in plant_collection.find():
        plants.append(plant_helper(plant))
    return plants

# Get a specific plant by ID
async def get_plant(id: str) -> dict:
    plant = await plant_collection.find_one({"_id": ObjectId(id)})
    if plant:
        return plant_helper(plant)
    return None

# Add a new plant
async def add_plant(plant_data: dict) -> dict:
    plant = await plant_collection.insert_one(plant_data)
    new_plant = await plant_collection.find_one({"_id": plant.inserted_id})
    return plant_helper(new_plant)

# Get a plant by name
async def get_plant_byname(name: str) -> dict:
    plant = await plant_collection.find_one({"name": name})
    if plant:
        return plant_helper(plant)
    return None

# Delete a plant by ID
async def delete_plant(id: str) -> dict:
    deleted_plant = await plant_collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_plant:
        return plant_helper(deleted_plant)
    return None

# Update a plant by ID
async def update_plant(id: str, plant_data: dict) -> dict: 
    updated_plant = await plant_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": plant_data},  
        return_document=True
    )
    if updated_plant:
        return plant_helper(updated_plant)
    return None

# Add a new user
async def add_user(user_data: dict) -> dict:
    user = await user_collection.insert_one(user_data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)

# Get a specific user by ID
async def get_user(id: str) -> dict:
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)
    return None

# Get a user by email
async def get_user_by_email(email: str) -> dict:
    user = await user_collection.find_one({"email": email})
    if user:
        return user_helper(user)
    return None

# Update a user by ID
async def update_user(id: str, user_data: dict) -> dict: 
    updated_user = await user_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": user_data},  
        return_document=True
    )
    if updated_user:
        return user_helper(updated_user)
    return None

# Delete a user by ID
async def delete_user(id: str) -> dict:
    deleted_user = await user_collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_user:
        return user_helper(deleted_user)
    return None

