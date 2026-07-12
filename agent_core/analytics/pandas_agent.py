import pandas as pd
from langchain_openai import ChatOpenAI
# from langchain_experimental.agents import create_pandas_dataframe_agent

class InventoryForecaster:
    def __init__(self, data_path="data/mock_telemetry.csv"):
        self.data_path = data_path
        # self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

    def forecast_depletion(self):
        """Analyzes telemetry data and returns SKUs at risk of stockout."""
        try:
            df = pd.read_csv(self.data_path)
            # Dummy forecasting logic
            at_risk = df[df['current_stock'] < 20]
            return at_risk.to_dict('records')
        except Exception as e:
            return f"Error forecasting: {str(e)}"
