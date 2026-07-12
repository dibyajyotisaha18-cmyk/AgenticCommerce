import os
from dotenv import load_dotenv
# Load environment variables from .env
load_dotenv(dotenv_path="../.env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from crew import ECommerceCrew, Crew
from tasks import create_tasks

app = FastAPI()

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Agent Core is Running"}

@app.post("/api/run-agent")
def run_agent_cycle():
    """Trigger the agent cycle manually."""
    print("\n[Agent Core] Starting Agent Cycle...")
    
    # Initialize Custom Crew
    ecommerce_crew = ECommerceCrew()
    researcher, inventory_mgr, optimizer = ecommerce_crew.create_agents()
    
    # Simple mock data representing current telemetry
    telemetry_data = (
        "SKU-1001 (Wireless Earbuds): Stock: 50, Price: $49.99, Daily Sales: 5.2. "
        "SKU-1002 (Smart Watch): Stock: 12, Price: $129.99, Daily Sales: 3.1. "
        "SKU-1004 (Gaming Mouse): Stock: 5, Price: $59.99, Daily Sales: 2.0."
    )
    
    tasks = create_tasks(researcher, inventory_mgr, optimizer, telemetry_data)
    
    crew = Crew(
        agents=[researcher, inventory_mgr, optimizer],
        tasks=tasks
    )
    
    # Execute the crew tasks sequentially using Groq
    result = crew.kickoff()
    
    print("\n[Agent Core] Agent Cycle Completed successfully!")
    return {
        "message": "Agent cycle completed successfully",
        "status": "success",
        "result": result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
