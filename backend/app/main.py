from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import events, webhook, model

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://acoer-tox2fhir.onrender.com", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
app.include_router(events.router, prefix="/events", tags=["Events"])
app.include_router(webhook.router, prefix="/webhook", tags=["Webhooks"])
app.include_router(model.router, prefix="/model", tags=["Model"])
