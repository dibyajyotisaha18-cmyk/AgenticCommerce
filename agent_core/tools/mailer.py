from langchain_core.tools import tool

@tool("Draft Supplier Email")
def draft_supplier_email(sku: str, quantity: int) -> str:
    """Drafts an email to the supplier via SendGrid to reorder stock when depletion risk is high."""
    return f"Drafted email to supplier for {quantity} units of {sku}."
