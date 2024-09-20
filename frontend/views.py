from django.shortcuts import redirect, render
from pypinyin.contrib.tone_convert import to_tone as pinyin_normalizer

from dictionary.models import Article


def index(request):
    context = {"article_number": Article.objects.count()}

    return render(request, "frontend/index.html", context)


def search(request):
    query = request.GET["query"]
    articles = Article.objects.filter(title__icontains=query)

    for article in articles:
        if article.title.lower() == query.lower():
            return redirect("view_article", article.title)

    context = {"query": query, "articles": articles}
    return render(request, "frontend/search.html", context)


def view_article(request, article_title):
    article = Article.objects.filter(title=article_title).first()

    if article.translation_direction == Article.TranslationDirection.CN_TO_BEL:
        pinyin = pinyin_normalizer(article.pinyin)
    else:
        pinyin = ""

    context = {"article": article, "pinyin": pinyin}
    return render(request, "frontend/view.html", context)
