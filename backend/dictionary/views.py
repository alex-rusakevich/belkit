import re

from django.http import JsonResponse
from haystack.query import SearchQuerySet
from haystack.utils.highlighting import Highlighter
from lemmatizer_be import BnkorpusLemmatizer

from dictionary.api.article import ArticleSerializer
from dictionary.api.example import ExampleSerializer
from dictionary.models import Article, Example
from dictionary.search_indexes import BnkPrepareIndexText

lm = BnkorpusLemmatizer()


def queryset_gen(search_qs):
    for item in search_qs:
        yield item.object


class FoundQueryHighlighter(Highlighter):
    def render_html(self, highlight_locations=None, start_offset=None, end_offset=None):
        highlighted_chunk = self.text_block
        open_tag = f"<{self.html_tag} class='{self.css_class}'>"
        closing_tag = f"</{self.html_tag}>"

        for word in self.query_words:
            highlighted_chunk = re.sub(
                word, open_tag + r"\g<0>" + closing_tag, highlighted_chunk
            )

        return highlighted_chunk


def search_possible(request):
    query = lm.lemmatize(request.GET["query"])
    query = BnkPrepareIndexText.gen_index_string(query)

    results = SearchQuerySet().filter(content=query)

    articles = results.models(Article)
    examples = results.models(Example)

    # region Highlighting
    highlight = FoundQueryHighlighter(
        query, html_tag="span", css_class="query-found", max_length=65_535
    )

    highlighted_articles = []
    highlighted_examples = []

    for article in queryset_gen(articles):
        article.title = highlight.highlight(article.title)
        article.pronunciation = highlight.highlight(article.pronunciation)
        article.body = highlight.highlight(article.body)

        highlighted_articles.append(article)

    for example in queryset_gen(examples):
        example.body_zh = highlight.highlight(example.body_zh)
        example.body_be = highlight.highlight(example.body_be)

        highlighted_examples.append(example)
    # endregion

    return JsonResponse(
        {
            "articles": ArticleSerializer(highlighted_articles, many=True).data,
            "examples": ExampleSerializer(highlighted_examples, many=True).data,
        },
        json_dumps_params={"ensure_ascii": False},
    )
