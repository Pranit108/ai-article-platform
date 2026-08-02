from app.ai.client import client
from app.ai.prompts import CONCEPT_PROMPT
import json

def extract_concepts(article: str):

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b:free",
        messages=[
            {
                "role": "system",
                "content": CONCEPT_PROMPT,
            },
            {
                "role": "user",
                "content": article,
            },
        ],
    )

    return json.loads(response.choices[0].message.content)