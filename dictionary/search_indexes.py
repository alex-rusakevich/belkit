import nltk
from django.template.loader import render_to_string
from haystack import indexes
from lemmatizer_be import BnkorpusLemmatizer

from .models import Article, Example

nltk.download("punkt_tab")


class BnkLemmasIndex:
    def prepare_text(self, obj):
        lemmatizer = BnkorpusLemmatizer()
        obj_name = obj.__class__.__name__.lower()
        text = render_to_string(
            "search/indexes/dictionary/{}_text.txt".format(obj_name), {"object": obj}
        )

        words = nltk.word_tokenize(text)
        lemmas = " ".join(lemmatizer.lemmatize(word) for word in words)
        return lemmas


class ArticleIndex(indexes.SearchIndex, indexes.Indexable, BnkLemmasIndex):
    text = indexes.EdgeNgramField(document=True, use_template=True)

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()

    def get_updated_field(self):
        return "updated_at"


class ExampleIndex(indexes.SearchIndex, indexes.Indexable, BnkLemmasIndex):
    text = indexes.EdgeNgramField(document=True, use_template=True)

    def get_model(self):
        return Example

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()

    def get_updated_field(self):
        return "updated_at"
