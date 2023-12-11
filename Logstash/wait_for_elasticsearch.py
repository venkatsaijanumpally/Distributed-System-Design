import requests
import time
import os

ELASTICSEARCH_HOST = os.environ.get("ELASTICSEARCH_HOST", "elasticsearch")
ELASTICSEARCH_PORT = int(os.environ.get("ELASTICSEARCH_PORT", 9200))

def wait_for_elasticsearch():
    time.sleep(25)
    url = f"http://{ELASTICSEARCH_HOST}:{ELASTICSEARCH_PORT}"

    while True:
        try:
            response = requests.get(url)
            response.raise_for_status()
            print("Elasticsearch is up and running!")
            break
        except requests.ConnectionError:
            print("Waiting for Elasticsearch to start...")
            time.sleep(2)

def create_index():
    url = f"http://{ELASTICSEARCH_HOST}:{ELASTICSEARCH_PORT}/reviews"

    index_mapping = {
        "mappings": {
            "properties": {
                "review_id": {"type": "keyword"},
                "reviewer": {"type": "keyword"},
                "movie": {"type": "keyword"},
                "rating": {"type": "integer"},
                "review_summary": {"type": "text"},
                "review_date": {"type": "date", "format": "dd MMM yyyy"},
                "spoiler_tag": {"type": "integer"},
                "review_detail": {"type": "text"},
                "helpful": {"type": "nested", "properties": {"value": {"type": "integer"}}}
            }
        }
    }

    response = requests.put(url)
    response.raise_for_status()
    print("Index 'reviews' created successfully!")

if __name__ == "__main__":
    wait_for_elasticsearch()
    create_index()
