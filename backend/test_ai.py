from app.ai.concept_extractor import extract_concepts

article = """
The Roman Senate governed alongside the Consuls during the Roman Republic.
Julius Caesar eventually became dictator.
"""

print(extract_concepts(article))