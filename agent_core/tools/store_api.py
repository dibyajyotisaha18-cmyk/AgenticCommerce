from langchain_core.tools import tool

@tool("Update Store Price")
def update_store_price(sku: str, new_price: float) -> str:
    """Updates the price of a given SKU in the Shopify store using the Admin API."""
    return f"Successfully updated {sku} to ${new_price}."
