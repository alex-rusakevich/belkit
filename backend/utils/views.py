import re
from logging import getLogger
from typing import List

from django.http import HttpResponseBadRequest, JsonResponse
from lemmatizer_be import BnkorpusLemmatizer
from pypinyin.contrib.tone_convert import to_tone

logger = getLogger(__name__)
lm = BnkorpusLemmatizer()


def tokenize(text: str) -> List[str]:
    tokens = re.findall(r"\w+|[^\w\s]+", text, re.UNICODE)
    return tokens


def pinyin_num_to_tone(request):
    if "text" not in request.GET:
        return HttpResponseBadRequest('missing "text" field in GET params')

    text = request.GET["text"]

    logger.info(tokenize(text))

    result = ""

    for token in tokenize(text):
        if re.match(r"[^\w\s]+", token, re.UNICODE):
            result += token + " "
        else:
            result += to_tone(token)

    return JsonResponse({"value": result})


def get_lemmas(request):
    return JsonResponse({"result": lm.lemmas(request.GET["word"])})


def get_lemma(request):
    return JsonResponse({"result": lm.lemmatize(request.GET["word"])})
