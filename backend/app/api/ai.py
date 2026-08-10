from fastapi import APIRouter
from pydantic import BaseModel
from google import genai

from app.core.config import settings

router = APIRouter(prefix="/ai", tags=["AI"])


class AIRequest(BaseModel):
    question: str


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)

@router.post("/ask")
def ask_ai(data: AIRequest):

    try:
        prompt = f"""
You are a professional cybersecurity analyst.

Answer this question:

{data.question}

If the question is about a CVE, explain:
- What it is
- Severity
- Impact
- Exploitation
- Mitigation
- Patch recommendation

Keep the answer professional.
"""

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return {
            "answer": response.text
        }

    except Exception as e:
        print(e)
        return {
            "error": str(e)
        }