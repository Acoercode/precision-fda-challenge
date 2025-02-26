import pymongo
import time
import os
from bson.objectid import ObjectId
from openai import OpenAI
from dotenv import load_dotenv
from app.services.data_stamping import data_stamp_bundle

# Load environment variables from .env file
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(
    api_key=openai_api_key,  # This is the default and can be omitted
)

# MongoDB Connection TODO

# File Path to Training Data
training_file_path = os.path.join(os.path.dirname(__file__), "feedback_training_data_chat.jsonl")


# Step 1: Upload Training File
def upload_training_file(file_path):
    print("Uploading training file...")
    response = client.files.create(
        file=open(file_path, "rb"),
        purpose="fine-tune"
    )
    print('RESPONSE', response)
    print(f"File uploaded. File ID: {response.id}")
    return response.id


# Step 2: Fine-Tune the Model
def fine_tune_model(training_file_id, base_model="gpt-3.5-turbo", suffix="fine-tuned-feedback"):
    print("Starting fine-tuning...")
    response = client.fine_tuning.jobs.create(
        training_file=training_file_id,
        model=base_model,
        suffix=suffix
    )
    print(f"Fine-tuning started. Fine-tune ID: {response.id}")
    return response.id


# Step 3: Monitor Fine-Tuning
def monitor_fine_tuning(fine_tune_id):
    print("Monitoring fine-tuning...")
    while True:
        response = client.fine_tuning.jobs.retrieve(fine_tune_id)
        status = response.status
        print(f"Status: {status}")
        if status in ["succeeded", "failed"]:
            if status == "succeeded":
                model_id = response.fine_tuned_model
                print(f"Fine-tuning succeeded. Model ID: {model_id}")
                return model_id
            else:
                raise RuntimeError(f"Fine-tuning failed: {response}")
        time.sleep(30)


# Step 4: Save Model ID to MongoDB
def save_model_to_db(model_id):
    # Read the training data from the provided file
    try:
        with open(training_file_path, "r") as file:
            training_data = file.readlines()  # Read all lines of the JSONL file
    except Exception as e:
        print(f"Error reading training data file: {e}")
        raise

    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    data_stamp_bundle('model', training_data, model_id, timestamp, model_id)

    return model_id


# Step 5: Use the Fine-Tuned Model in FHIR Bundle Generator
def use_fine_tuned_model(prompt, model_id):
    print("Using the fine-tuned model...")
    response = client.chat.completions.create(
        model=model_id,
        messages=prompt,
        max_tokens=500,
        temperature=0
    )
    print(f"Response: {response['choices'][0]['text']}")
    return response["choices"][0]["text"]


# Main Workflow
if __name__ == "__main__":
    try:
        # Upload Training File
        training_file_id = upload_training_file(training_file_path)

        # Fine-Tune Model
        fine_tune_id = fine_tune_model(training_file_id)

        # Monitor Fine-Tuning Process
        fine_tuned_model_id = monitor_fine_tuning(fine_tune_id)

        # Save Model ID to MongoDB
        document_id = save_model_to_db(fine_tuned_model_id)


    except Exception as e:
        print(f"Error: {e}")
