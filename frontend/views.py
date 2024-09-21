import re

from django.db.models import Q
from django.shortcuts import redirect, render
from pypinyin.contrib.tone_convert import to_tone as pinyin_normalizer

from dictionary.models import Article, Example
from dictionary.utils.dsl import dsl_to_html


def index(request):
    context = {
        "articles_number": Article.objects.count(),
        "examples_number": Example.objects.count(),
    }

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
        examples_objects = Example.objects.filter(chinese_text__icontains=article_title)
    else:
        pinyin = ""
        examples_objects = Example.objects.filter(
            belarusian_text__icontains=article_title
        )

    # region Adding examples
    examples = []
    for example_obj in examples_objects:
        examples.append(
            {
                "be": re.sub(
                    article_title,
                    f"<span class='text-success'>{article_title}</span>",
                    example_obj.belarusian_text,
                ),
                "cn": re.sub(
                    article_title,
                    f"<span class='text-success'>{article_title}</span>",
                    example_obj.chinese_text,
                ),
                "id": example_obj.id,
            }
        )
    # endregion

    # region Adding similar words
    similar_articles = Article.objects.filter(title__icontains=article_title).filter(
        ~Q(title=article_title)
    )
    # endregion

    article.body = dsl_to_html(article.body)

    context = {
        "article": article,
        "pinyin": pinyin,
        "examples": examples,
        "similar_articles": similar_articles,
    }
    return render(request, "frontend/view.html", context)


def tone_numbers_to_pinyin(request):
    tone_and_numbers = request.GET.get("tone_and_numbers", "")
    if tone_and_numbers:
        tone_and_numbers = pinyin_normalizer(tone_and_numbers)

    context = {"tone_and_numbers": tone_and_numbers}
    return render(request, "frontend/utils/tone-numbers-to-pinyin.html", context)
