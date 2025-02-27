import hashlib
import requests
import json
import os
from app.services.db import post_data_stamping
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("DATA_STAMP_API_KEY")
API_ROOT = os.getenv("DATA_STAMP_API_ROOT")


def data_stamp_event(collection, data, timestamp):
    """
    Data stamp bundle for trust and save response to db.
    """

    print('AM I IN HERE AT LEAST?')
    # Ensure `data` is serialized to a JSON string
    if isinstance(data, (dict, list)):  # Handle both dictionaries and lists
        data = json.dumps(data, sort_keys=True)  # Serialize into a sorted JSON string
    elif not isinstance(data, str):  # Raise an error if `data` is not JSON-serializable
        raise ValueError("Input data must be a dictionary, list, or JSON string.")

    # Compute SHA-256 hash
    hash_object = hashlib.sha256(data.encode('utf-8'))
    hex_dig = hash_object.hexdigest()

    headers = {
        'APIKey': API_KEY,
        'Content-Type': 'application/json'
    }

    payload = {"data": hex_dig}

    try:
        # Use `json` parameter to ensure payload is sent as JSON
        response = requests.post(API_ROOT, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP errors
        response_data = response.json()
        stamp_id = response_data['_id']

        print(f"Full API response: {response_data}")

        post_data_stamping(collection, stamp_id, data, response_data, timestamp)

        return response_data

    except requests.RequestException as e:
        print(f"API request failed: {e}")
        return
    except json.JSONDecodeError:
        print("Failed to decode response JSON.")
        return
