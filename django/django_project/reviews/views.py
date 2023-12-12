from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from elasticsearch import Elasticsearch
from django.conf import settings

def say_hello(request):
    return HttpResponse('Hello World')

def search_reviews(request, reviewer):
    if not reviewer:
        return JsonResponse({'error': 'reviewer parameter is required'}, status=400)

    es = Elasticsearch([{'host': settings.ELASTICSEARCH_HOST, 'port': settings.ELASTICSEARCH_PORT}])

    # Customize the Elasticsearch query based on your data model
    es_query = {
        'query': {
            'match': {
                'reviewer': reviewer
            }
        },
        'size': 10  # Retrieve 10 entries
    }

    try:
        # Perform the Elasticsearch search
        result = es.search(index=settings.ELASTICSEARCH_INDEX, body=es_query)
        hits = result['hits']['hits']
        print(str(hits))
        # Extract relevant information from the hits
        # Process the search results as needed
        reviews = result.get('hits', {}).get('hits', [])

        return JsonResponse({'reviews': reviews})
    except Exception as e:
        return JsonResponse({'error': f'Error performing search: {str(e)}'}, status=500)

