import pymongo
import json
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_DB_CLIENT = os.getenv("MONGO_DB_CLIENT")
DB_CLIENT = pymongo.MongoClient(
    MONGO_DB_CLIENT,
    connectTimeoutMS=None
)
DB = DB_CLIENT['precision-fda']
COLLECTION = DB['fda-events']


def get_all_events(skip: int, limit: int):
    return list(
        COLLECTION.find({})
            .sort("stamp.date", -1)  # Sort by `stamp.date` in ascending order
            .skip(skip)
            .limit(limit)
    )


def get_event_by_id(event_id: str):
    return COLLECTION.find_one({"_id": event_id})


def post_data_stamping(collection, stamp_id, data, response_data, timestamp):
    if isinstance(data, str):  # ✅ If `data` is a string, convert it to a dictionary
        data = json.loads(data)
    if collection == 'event':
        return COLLECTION.insert_one({
            '_id': stamp_id,
            'event_data': data,
            'stamp': response_data,
        })
    elif collection == 'model':
        return MODEL_COLLECTION.insert_one({
            '_id': stamp_id,
            'training_data': data,
            'model_id': latest_model,
            'stamp': response_data,
            'created_at': timestamp,
        })
    else:
        raise ValueError("Invalid collection type. Expected 'bundle' or 'model'.")


def update_event_in_collection(collection, event_id: str, update_data: dict):
    """
    Update an event in the database by its ID.
    """
    result = collection.update_one(
        {"_id": event_id},
        {"$set": {"stamp": update_data}}
    )
    return result.matched_count > 0


# def retrieve_latest_model():
#     """
#     Retrieve the latest model document from the MongoDB collection based on the 'created_at' field.
#     """
#     try:
#         # Retrieve the latest document by sorting on 'created_at' field in descending order
#         saved_model = MODEL_COLLECTION.find_one(sort=[("created_at", pymongo.DESCENDING)])
#         if not saved_model:
#             print("No model found in the database.")
#             return None
#         # print(f"Retrieved model: {saved_model}")
#         return saved_model
#     except Exception as e:
#         print(f"An error occurred while retrieving the model: {e}")
#         return None


# def get_all_models(skip: int, limit: int):
#     return list(
#         MODEL_COLLECTION.find({})
#             .sort("created_at", 1)
#             .skip(skip)
#             .limit(limit)
#     )
