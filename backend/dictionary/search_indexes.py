import jieba
import regex as re
from django.template.loader import render_to_string
from haystack import indexes
from lemmatizer_be import BnkorpusLemmatizer

from .models import Article, Example

lemmatizer = BnkorpusLemmatizer()


class BnkPrepareIndexText:
    punct = re.compile(r"\p{P}+")
    double_space = re.compile(r" {2,}")

    @staticmethod
    def punct_to_space(text):
        result = BnkPrepareIndexText.punct.sub(" ", text)
        result = BnkPrepareIndexText.double_space.sub(" ", result)
        return result.strip()

    @staticmethod
    def indexify_word(word):
        return lemmatizer.lemmatize(word)

    @staticmethod
    def gen_index_string(text: str) -> str:
        # region Tokenize both Belarusian and Chinese input
        words = jieba.cut(BnkPrepareIndexText.punct_to_space(text), cut_all=True)
        words = [w for w in words if w.strip()]
        # endregion

        return " ".join(BnkPrepareIndexText.indexify_word(word) for word in words)

    def prepare_text(self, obj):
        obj_name = obj.__class__.__name__.lower()
        text = render_to_string(
            "search/indexes/dictionary/{}_text.txt".format(obj_name), {"object": obj}
        )
        return self.gen_index_string(text)


class ArticleIndex(indexes.SearchIndex, indexes.Indexable, BnkPrepareIndexText):
    text = indexes.CharField(document=True, use_template=True)

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()

    def get_updated_field(self):
        return "updated_at"


class ExampleIndex(indexes.SearchIndex, indexes.Indexable, BnkPrepareIndexText):
    text = indexes.CharField(document=True, use_template=True)

    def get_model(self):
        return Example

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()

    def get_updated_field(self):
        return "updated_at"
