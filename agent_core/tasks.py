from crew import Task

def create_tasks(market_researcher, inventory_manager, pricing_optimizer, telemetry_data):
    research_task = Task(
        description=f"Analyze the market for the following SKUs and get competitor average prices. Data: {telemetry_data}",
        expected_output="A report detailing the current competitor average price for each SKU.",
        agent=market_researcher
    )

    inventory_task = Task(
        description=f"Review the telemetry data for low stock. If stock is below 20, draft a supplier email. Data: {telemetry_data}",
        expected_output="Confirmation of drafted supplier emails for low-stock items.",
        agent=inventory_manager
    )

    pricing_task = Task(
        description=f"Based on the market research report and inventory levels, calculate the optimal price and execute store updates. Data: {telemetry_data}",
        expected_output="A list of updated prices for each SKU.",
        agent=pricing_optimizer
    )

    return [research_task, inventory_task, pricing_task]
