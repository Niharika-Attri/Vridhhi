from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_user,
    get_user,
    get_user_by_email,
    delete_user,
    update_user
)
from server.models.usermodel import (
    UserErrorResponseModel,
    UserResponseModel,
    UserSchema,
    UpdateUserSchema,
)

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

# Get a specific user by ID
@router.get("/{id}", response_description="Specific user data retrieved")
async def get_single_user(id: str):
    try: 
        user = await get_user(id)
        if user:
            return UserResponseModel(user, "User data retrieved successfully")
        return UserErrorResponseModel("Error retrieving the user", 404, "User doesn't exist")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred retrieving the user data: {e}")

# Register a new user
@router.post("/register", response_description="User registered successfully")
async def add_new_user(user: UserSchema = Body(...)):
    try:
        user_data = jsonable_encoder(user)
        existing_user = await get_user_by_email(user_data['email'])
        if existing_user:
            return UserErrorResponseModel("An error occurred adding the user", 409, "User with this email already exists.")
        new_user = await add_user(user_data)
        return UserResponseModel(new_user, "User registered successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred registering the user: {e}")

# Delete a user by ID
@router.delete("/delete", response_description="User deleted successfully")
async def delete_by_id(id: str):
    try:
        deleted_user = await delete_user(id)
        if deleted_user:
            return UserResponseModel(deleted_user, "User deleted successfully")
        raise HTTPException(status_code=404, detail="User not found for deletion")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting the user data: {e}")

# Update a user by ID
@router.put("/update", response_description="User data updated successfully")
async def update_by_id(id: str, user: UpdateUserSchema = Body(...)):
    try:
        user_data = jsonable_encoder(user, exclude_unset=True)
        user_data = {key: value for key, value in user_data.items() if key != "_id"}
        updated_user = await update_user(id, user_data)
        if updated_user:
            return UserResponseModel(updated_user, "User updated successfully")
        raise HTTPException(status_code=404, detail="User data not found for updating")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating the user data: {e}")
