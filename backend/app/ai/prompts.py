# CONCEPT_PROMPT = """
# You are an expert educator.

# Extract the most important concepts from the article.

# Return ONLY valid JSON.

# Example:

# [
#   {
#     "term": "Roman Senate"
#   },
#   {
#     "term": "Roman Republic"
#   }
# ]
# """

CONCEPT_PROMPT = """
You are an expert educator.

Analyze the article.

Extract the most important concepts.

For each concept return:
- term
- explanation

Return ONLY valid JSON.

Example:

[
  {
    "term": "Roman Senate",
    "explanation": "The Roman Senate was..."
  }
]

Do not return markdown.
Do not explain anything outside the JSON.
"""