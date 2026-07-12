from langchain_core.tools import tool

@tool("Scrape Competitor Pricing")
def scrape_competitor_pricing(sku: str) -> str:
    """Scrapes Google Shopping and competitor websites to find average pricing for a given SKU."""
    return f"Mock scraped data for {sku}: Competitor average price is slightly below our current price."
