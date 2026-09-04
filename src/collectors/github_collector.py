import httpx
import shutil
import subprocess
import os
import datetime
from typing import List, Dict, Any

def _get_github_token() -> str:
    token = os.getenv(\"GITHUB_TOKEN\") or os.getenv(\"GH_TOKEN\")
    if token:
        return token
    # Try finding gh cli
    gh_cmd = shutil.which(\"gh\") or r\"C:\Program Files\GitHub CLI\gh.exe\"
    if os.path.exists(gh_cmd):
        try:
            res = subprocess.run([gh_cmd, \"auth\", \"token\"], capture_output=True, text=True, check=True)
            return res.stdout.strip()
        except Exception:
            pass
    return \"\"

def fetch_trending_repos(days_back: int = 7, limit: int = 5) -> List[Dict[str, Any]]:
    \"\"\"
    Fetches newly created repositories that are rapidly accumulating stars.
    \"\"\"
    results = []
    token = _get_github_token()
    headers = {\"User-Agent\": \"DailyTechPulse/1.0\"}
    if token:
        headers[\"Authorization\"] = f\"Bearer {token}\"

    since_date = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=days_back)).strftime(\"%Y-%m-%d\")
    # Query: created in last N days, sorted by stars descending
    url = f\"https://api.github.com/search/repositories?q=created:>{since_date}&sort=stars&order=desc&per_page={limit}\"

    try:
        with httpx.Client(timeout=15.0, headers=headers) as client:
            resp = client.get(url)
            if resp.status_code == 200:
                items = resp.json().get(\"items\", [])
                for item in items:
                    results.append({
                        \"name\": item.get(\"full_name\", \"\"),
                        \"stars\": item.get(\"stargazers_count\", 0),
                        \"forks\": item.get(\"forks_count\", 0),
                        \"description\": item.get(\"description\") or \"No description provided.\",
                        \"language\": item.get(\"language\") or \"Multi/Other\",
                        \"topics\": item.get(\"topics\", [])[:4],
                        \"url\": item.get(\"html_url\", \"\"),
                        \"owner\": item.get(\"owner\", {}).get(\"login\", \"\")
                    })
            else:
                print(f\"[!] GitHub search returned {resp.status_code}: {resp.text}\")
    except Exception as e:
        print(f\"[!] Error querying GitHub trending repos: {e}\")

    return results

if __name__ == \"__main__\":
    repos = fetch_trending_repos(7, 3)
    for r in repos:
        print(f\"{r['name']} ({r['stars']} stars) - {r['language']}: {r['description']}\")
