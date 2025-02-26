from fastapi import FastAPI, HTTPException, APIRouter
# from app.services.db import retrieve_latest_model, get_all_models
from bson import ObjectId
from pydantic import BaseModel
from typing import Any, Dict, List
from fastapi.responses import JSONResponse

router = APIRouter()


# # Helper function to convert MongoDB documents to JSON serializable
# def serialize_model(model):
#     return {key: str(value) if isinstance(value, ObjectId) else value for key, value in model.items()}
#
#
# @router.get("/latest-model")
# async def get_latest_model():
#     """
#     API endpoint to retrieve the latest model based on the 'created_at' field.
#     """
#     try:
#         # Call the external function to retrieve the latest model
#         saved_model = retrieve_latest_model()  # Ensure this is awaited if it's async
#
#         if not saved_model:
#             raise HTTPException(status_code=404, detail="No model found")
#
#         # Return the model
#         return saved_model
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred while retrieving the latest model: {str(e)}")
#
#
# @router.get("/models")
# async def get_models(skip: int = 0, limit: int = 10):
#     """
#     API endpoint to retrieve all models with pagination.
#     """
#     try:
#         # Call the external function to retrieve models
#         models = get_all_models(skip, limit)  # Ensure this is awaited if it's async
#
#         if not models:
#             return JSONResponse(
#                 status_code=404,
#                 content={"message": "No models found in the database."}
#             )
#
#         # Serialize models to make them JSON serializable
#         serialized_models = [serialize_model(model) for model in models]
#
#         # Return the serialized models
#         return serialized_models
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred while fetching models: {str(e)}")
