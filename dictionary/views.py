from django.http import JsonResponse
from haystack.query import SearchQuerySet
from lemmatizer_be import BnkorpusLemmatizer

from dictionary.api.article import ArticleSerializer
from dictionary.api.example import ExampleSerializer
from dictionary.models import Article, Example
from dictionary.search_indexes import BnkPrepareIndexText

lm = BnkorpusLemmatizer()


def queryset_gen(search_qs):
    for item in search_qs:
        yield item.object


def search_possible(request):
    query = lm.lemmatize(request.GET["query"])
    query = BnkPrepareIndexText.indexify(query)

    results = SearchQuerySet().filter(content=query)

    articles = results.models(Article)
    examples = results.models(Example)

    return JsonResponse(
        {
            "articles": ArticleSerializer(queryset_gen(articles), many=True).data,
            "examples": ExampleSerializer(queryset_gen(examples), many=True).data,
        },
        json_dumps_params={"ensure_ascii": False},
    )
