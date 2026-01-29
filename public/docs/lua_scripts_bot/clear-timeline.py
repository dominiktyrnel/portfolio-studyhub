"""
Clear Timeline Script
Run this once to clear old timeline data from Firestore
"""
import requests
import json

FIREBASE_PROJECT_ID = "YOUR_PROJECT_ID"  # Get from Firebase Console
FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY"  # Get from Firebase Console > Project Settings
FIREBASE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents"

def clear_timeline():
    """Clear timelineCompact from runtime/obsPomodoro"""
    doc = {
        "fields": {
            "timelineCompact": {
                "arrayValue": {
                    "values": []
                }
            }
        }
    }
    
    write_url = f"{FIREBASE_URL}/runtime/obsPomodoro?key={FIREBASE_API_KEY}&updateMask.fieldPaths=timelineCompact"
    headers = {"Content-Type": "application/json"}
    
    response = requests.patch(
        write_url,
        headers=headers,
        data=json.dumps(doc),
        timeout=10
    )
    
    if response.status_code in [200, 201]:
        print("✅ Timeline cleared successfully!")
    else:
        print(f"❌ Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    clear_timeline()
