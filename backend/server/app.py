from fastapi import FastAPI
from server.routes.plants import router as plantRouter  # Updated import for plants
from server.routes.users import router as userRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from server.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    global collection  # Ensure the global `collection` is set properly
    collection = await init_db()  # Initialize the database
    if collection is None:
        print("Database connection failed during app startup.")
    else:
        print("Database connection initialized successfully.")
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to allow specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(userRouter)
app.include_router(plantRouter)  # Updated to use plantRouter
