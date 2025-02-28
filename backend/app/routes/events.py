from fastapi import APIRouter, HTTPException
from app.services.db import get_event_by_id, get_all_events
from app.services.data_stamping import data_stamp_event
from fastapi.responses import JSONResponse
import time
import json
from typing import Dict

router = APIRouter()


@router.post("/record-event")
async def record_event(payload: Dict):
    """
    Record event
    """

    try:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

        data_stamp = data_stamp_event("event", payload, timestamp)

        return data_stamp

    except Exception as e:
        print(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while fetching events.")


@router.get("/")
async def get_events(skip: int = 0, limit: int = 10):
    """
    Fetch all events from the MongoDB collection with optional pagination.
    """
    try:
        # Query the MongoDB collection with skip and limit
        events = get_all_events(skip, limit)

        if not events:
            return JSONResponse(
                status_code=404,
                content={"message": "No events found in the database."}
            )

        # Return all events
        return JSONResponse(content={"events": events}, status_code=200)

    except Exception as e:
        print(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while fetching events.")


@router.get("/{id}")
async def get_event(id: str):
    event = get_event_by_id(id)
    if not event:
        raise HTTPException(status_code=404, detail=f"No event found with id: {id}")
    return JSONResponse(content=event, status_code=200)
