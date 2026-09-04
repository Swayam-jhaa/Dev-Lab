import httpx
from typing import List, Dict, Any
from src.config import HN_TOP_STORIES_URL, HN_ITEM_URL

def fetch_top_tech_news(limit: int = 5) -> List[Dict[str, Any]]:
    \"\"\"
    Fetches top tech stories and major developments from Hacker News.
    \"\"\"
    results = []
    headers = {\"User-Agent\": \"DailyTechPulse/1.0\"}

    try:
        with httpx.Client(timeout=12.0, headers=headers) as client:
            resp = client.get(HN_TOP_STORIES_URL)
            if resp.status_code == 200:
                top_ids = resp.json()[:limit * 3] # Grab extra to filter
                count = 0
                for item_id in top_ids:
                    if count >= limit:
                        break
                    try:
                        item_resp = client.get(HN_ITEM_URL.format(item_id))
                        if item_resp.status_code == 200:
                            item = item_resp.json()
                            if not item or item.get(\"type\") != \"story\":
                                continue
                            
                            title = item.get(\"title\", \"\")
                            url = item.get(\"url\") or f\"https://news.ycombinator.com/item?id={item_id}\"
                            score = item.get(\"score\", 0)
                            by = item.get(\"by\", \"\")
                            
                            results.append({
                                \"headline\": title,
                                \"source\": \"Hacker News\",
                                \"url\": url,
                                \"score\": score,
                                \"author\": by,
                                \"hn_url\": f\"https://news.ycombinator.com/item?id={item_id}\"
                            })
                            count += 1
                    except Exception:
                        continue
    except Exception as e:
        print(f\"[!] Error fetching Hacker News stories: {e}\")

    return results

if __name__ == \"__main__\":
    stories = fetch_top_tech_news(3)
    for s in stories:
        print(f\"[{s['score']} pts] {s['headline']} -> {s['url']}\")
