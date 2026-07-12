import os
from langchain_groq import ChatGroq

# Initialize Groq LLM
# fallback to a dummy if GROQ_API_KEY is not set for structural testing
llm = ChatGroq(model="llama3-8b-8192", temperature=0.7, groq_api_key=os.getenv("GROQ_API_KEY", "dummy"))

class Agent:
    def __init__(self, role, goal, backstory, verbose=True, allow_delegation=False, tools=None, llm=None):
        self.role = role
        self.goal = goal
        self.backstory = backstory
        self.tools = tools or []
        self.llm = llm

class Task:
    def __init__(self, description, expected_output, agent):
        self.description = description
        self.expected_output = expected_output
        self.agent = agent

class Crew:
    def __init__(self, agents, tasks, process=None):
        self.agents = agents
        self.tasks = tasks

    def kickoff(self):
        """Custom sequential execution of tasks using LangChain."""
        context = ""
        last_result = ""
        for i, task in enumerate(self.tasks):
            print(f"\n[Agent Core] Starting Task {i+1} with agent: {task.agent.role}...")
            prompt = (
                f"You are a {task.agent.role}.\n"
                f"Goal: {task.agent.goal}\n"
                f"Backstory: {task.agent.backstory}\n\n"
                f"Task: {task.description}\n"
                f"Expected Output: {task.expected_output}\n\n"
                f"Context from previous steps:\n{context}\n\n"
                f"Provide your response:"
            )
            try:
                response = task.agent.llm.invoke(prompt)
                last_result = response.content
                context += f"\nResult from {task.agent.role}:\n{last_result}\n"
            except Exception as e:
                print(f"[Agent Core] Error during LLM call: {e}")
                last_result = f"Error executing task: {str(e)}"
                context += f"\nError from {task.agent.role}:\n{last_result}\n"
        return last_result

class ECommerceCrew:
    def __init__(self):
        pass

    def create_agents(self):
        market_researcher = Agent(
            role='Market Intelligence Analyst',
            goal='Monitor competitor pricing and market trends for e-commerce products',
            backstory='An expert analyst who scrapes the web for competitor prices and identifies pricing elasticity.',
            llm=llm
        )
        
        inventory_manager = Agent(
            role='Inventory Optimization Specialist',
            goal='Forecast inventory depletion and alert on stockout risks',
            backstory='A logistics expert who uses telemetry data to predict when stock will run out and drafts supplier orders.',
            llm=llm
        )

        pricing_optimizer = Agent(
            role='Dynamic Pricing Strategist',
            goal='Determine the optimal price point and update the store in real-time',
            backstory='A revenue optimization expert who balances margins and sales velocity to set the perfect price.',
            llm=llm
        )
        
        return market_researcher, inventory_manager, pricing_optimizer
