import pymongo
from fastapi import APIRouter, HTTPException
from app.services.db import update_event_in_collection
import os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

MONGO_DB_CLIENT = os.getenv("MONGO_DB_CLIENT")
DB_CLIENT = pymongo.MongoClient(
    MONGO_DB_CLIENT,
    connectTimeoutMS=None
)
DB = DB_CLIENT['precision-fda']
COLLECTION = DB['fda-events']


@router.post("/data-stamp-update")
async def webhook_data_stamp_update(payload: dict):
    """
    Webhook endpoint to handle updates to stamped data.
    """
    try:
        event_id = payload.get("_id")
        if not event_id:
            raise HTTPException(status_code=400, detail="Missing '_id' in the request payload.")

        update_result = update_event_in_collection(collection, event_id, payload)
        if update_result:  # Stop searching if the event is found and updated
            return {"message": f"Event updated successfully in collection: {collection}"}, 200

        # If no match is found in any collection
        return {"message": f"No event found with _id: {event_id} in any collection."}, 404

    except Exception as e:
        print(f"Webhook error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
