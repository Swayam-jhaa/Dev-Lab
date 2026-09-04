import httpx
from typing import List, Dict, Any
from src.config import HF_DAILY_PAPERS_URL, HF_TRENDING_MODELS_URL

def fetch_top_ai_breakthroughs(papers_limit: int = 4, models_limit: int = 4) -> Dict[str, Any]:
    \"\"\"
    Fetches breakthrough research papers and trending AI models from Hugging Face.
    \"\"\"
    papers = []
    models = []
    headers = {\"User-Agent\": \"DailyTechPulse/1.0\"}

    with httpx.Client(timeout=15.0, headers=headers) as client:
        # 1. Fetch Daily Papers
        try:
            resp = client.get(HF_DAILY_PAPERS_URL)
            if resp.status_code == 200:
                raw_papers = resp.json()
                for p in raw_papers[:papers_limit]:
                    paper_data = p.get(\"paper\", {}) if \"paper\" in p else p
                    papers.append({
                        \"title\": paper_data.get(\"title\", \"Untitled Paper\"),
                        \"summary\": paper_data.get(\"summary\", \"No summary available.\").replace(\"\n\", \" \").strip(),
                        \"upvotes\": paper_data.get(\"upvotes\", 0),
                        \"published_at\": paper_data.get(\"publishedAt\", \"\"),
                        \"url\": f\"https://huggingface.co/papers/{paper_data.get('id', '')}\" if paper_data.get('id') else \"https://huggingface.co/papers\",
                        \"authors\": [a.get(\"name\", \"\") for a in paper_data.get(\"authors\", [])][:3]
                    })
        except Exception as e:
            print(f\"[!] Error fetching AI papers: {e}\")

        # 2. Fetch Trending Models
        try:
            resp = client.get(HF_TRENDING_MODELS_URL)
            if resp.status_code == 200:
                raw_models = resp.json()
                for m in raw_models[:models_limit]:
                    models.append({
                        \"name\": m.get(\"id\", \"Unknown\"),
                        \"likes\": m.get(\"likes\", 0),
                        \"downloads\": m.get(\"downloads\", 0),
                        \"task\": m.get(\"pipeline_tag\", \"General AI\"),
                        \"url\": f\"https://huggingface.co/{m.get('id', '')}\"
                    })
        except Exception as e:
            print(f\"[!] Error fetching trending models: {e}\")

    return {
        \"papers\": papers,
        \"models\": models
    }

if __name__ == \"__main__\":
    data = fetch_top_ai_breakthroughs(2, 2)
    print(\"Papers:\", len(data[\"papers\"]))
    print(\"Models:\", len(data[\"models\"]))
