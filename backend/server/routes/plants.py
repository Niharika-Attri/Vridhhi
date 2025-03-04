from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_plant,
    get_all_plants,
    get_plant,
    get_plant_byname,
    delete_plant,
    update_plant
)
from server.models.plantmodel import (
    ErrorResponseModel,
    ResponseModel,
    PlantSchema,
    UpdatePlantSchema,
)

router = APIRouter(
    prefix="/plant",
    tags=["Plants"]
)

@router.get('/', response_description="Plants retrieved")
async def get_plants():
    try:
        plants = await get_all_plants()
        if plants:
            return ResponseModel(plants, "All plants retrieved successfully")
        return ResponseModel(plants, "Empty list received")
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"An error occurred retrieving the data: {e}")
    

@router.get("/{id}", response_description="Specific plant data retrieved")
async def get_single_plant(id: str):
    try: 
        plant = await get_plant(id)
        if plant:
            return ResponseModel(plant, "Plant data retrieved successfully")
        return ErrorResponseModel("Error retrieving the plant", 404, "Plant doesn't exist")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred retrieving the plant data: {e}")
    
@router.post("/add", response_description="Plant data added to the database")
async def add_new_plant(plant: PlantSchema = Body(...)):
    try:
        plant_data = jsonable_encoder(plant)
        print(plant_data)
        # existing_plant = await get_plant_byname(plant_data['name'])
        # print(existing_plant)
        # if existing_plant:
        #     return ErrorResponseModel("An error occurred adding the plant", 409, "Plant already exists.")
        new_plant = await add_plant(plant_data)
        await get_plants()
        return ResponseModel(new_plant, "Plant added to the database successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred adding the plant to database: {e}")
    
@router.delete("/delete", response_description="Document deleted")
async def delete_by_id(id: str):
    try:
        deleted_plant = await delete_plant(id)
        if deleted_plant:
            return ResponseModel(deleted_plant, "Plant deleted successfully")
        raise HTTPException(status_code=404, detail= "Plant not found for deletion")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting the plant data: {e}")
    
@router.put("/update", response_description="Document updated")
async def update_by_id(id: str, plant: UpdatePlantSchema = Body(...)):
    try:
        plant_data = jsonable_encoder(plant, exclude_unset=True)
        if "_id" in plant:
            plant["_id"] = str(plant["_id"])  
        plant_data = {key: value for key, value in plant_data.items() if key != "_id"}
        updated_plant = await update_plant(id, plant_data)
        if updated_plant:
            return ResponseModel(updated_plant, "Plant updated successfully")
        raise HTTPException(status_code=404, detail="Plant data not found for updating")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating the document: {e}")
