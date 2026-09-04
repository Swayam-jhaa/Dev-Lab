import httpx
from typing import List, Dict, Any
from src.config import CISA_KEV_URL

def fetch_top_cves(limit: int = 5) -> List[Dict[str, Any]]:
    \"\"\"
    Fetches the latest actively exploited vulnerabilities from the CISA KEV catalog.
    \"\"\"
    results = []
    try:
        headers = {\"User-Agent\": \"DailyTechPulse/1.0\"}
        with httpx.Client(timeout=15.0, headers=headers) as client:
            resp = client.get(CISA_KEV_URL)
            if resp.status_code == 200:
                data = resp.json()
                vulnerabilities = data.get(\"vulnerabilities\", [])
                # Sort by dateAdded descending
                sorted_vulns = sorted(vulnerabilities, key=lambda x: x.get(\"dateAdded\", \"\"), reverse=True)
                for item in sorted_vulns[:limit]:
                    results.append({
                        \"id\": item.get(\"cveID\", \"Unknown\"),
                        \"vendor\": item.get(\"vendorProject\", \"Unknown\"),
                        \"product\": item.get(\"product\", \"Unknown\"),
                        \"name\": item.get(\"vulnerabilityName\", \"\"),
                        \"date_added\": item.get(\"dateAdded\", \"\"),
                        \"summary\": item.get(\"shortDescription\", \"\"),
                        \"required_action\": item.get(\"requiredAction\", \"\"),
                        \"due_date\": item.get(\"dueDate\", \"\"),
                        \"ransomware_use\": item.get(\"knownRansomwareCampaignUse\", \"Unknown\"),
                        \"reference\": item.get(\"notes\", f\"https://nvd.nist.gov/vuln/detail/{item.get('cveID', '')}\")
                    })
    except Exception as e:
        print(f\"[!] Error fetching CVEs: {e}\")
    
    return results

if __name__ == \"__main__\":
    vulns = fetch_top_cves(3)
    for v in vulns:
        print(f\"[{v['id']}] {v['vendor']} - {v['product']}: {v['name']}\")
