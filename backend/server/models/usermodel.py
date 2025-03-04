from typing import Optional
from pydantic import BaseModel, Field, EmailStr

# Schema for User
class UserSchema(BaseModel):
    username: str = Field(..., example="plant_lover123")
    email: EmailStr = Field(..., example="plantlover@example.com")
    password: str = Field(..., min_length=8, example="strongpassword123")

    class Config:
        json_schema_extra = {
            "example": {
                "username": "nature_enthusiast",
                "email": "nature@example.com",
                "password": "securepassword123"
            }
        }

# Schema for Updating User
class UpdateUserSchema(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)

    class Config:
        json_schema_extra = {
            "example": {
                "username": "plant_guru",
                "email": "plantguru@example.com",
                "password": "newstrongpassword123"
            }
        }

# Response Model
def UserResponseModel(data, message):
    return {
        "data": [data],
        "statuscode": 200,
        "message": message
    }

# Error Response Model
def UserErrorResponseModel(error, code, message):
    return {
        "error": error,
        "statuscode": code,
        "message": message
    }
