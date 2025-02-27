from typing import Optional
from pydantic import BaseModel, Field

# Schema for Plant
class PlantSchema(BaseModel):
    name: str = Field(...)
    description: Optional[str]
    category: list[str] = Field(..., example=["Indoor", "Flowering", "Succulent"])
    date_planted: str = Field(..., example="2023-05-15")
    present_height: float = Field(..., example=15.5)
    initial_height: float = Field(..., example=10.0)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Aloe Vera",
                "description": "A succulent plant species of the genus Aloe, known for its medicinal properties.",
                "category": ["Indoor", "Succulent", "Medicinal"],
                "date_planted": "2023-03-10",
                "present_height": 25.5,
                "initial_height": 15.0
            }
        }

# Schema for Updating Plant
class UpdatePlantSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[list[str]] = None
    date_planted: Optional[str] = None
    present_height: Optional[float] = None
    initial_height: Optional[float] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Rose",
                "description": "A woody perennial flowering plant known for its beautiful blooms.",
                "category": ["Outdoor", "Flowering"],
                "date_planted": "2024-01-15",
                "present_height": 30.0,
                "initial_height": 20.0
            }
        }

# Response Model
def ResponseModel(data, message):
    return {
        "data": [data],
        "statuscode": 200,
        "message": message
    }

# Error Response Model
def ErrorResponseModel(error, code, message):
    return {
        "error": error,
        "statuscode": code,
        "message": message
    }
