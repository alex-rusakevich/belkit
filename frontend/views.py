from django.shortcuts import redirect, render

from dictionary.models import Article


def index(request):
    return render(request, "frontend/index.html")


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

    context = {"article": article}
    return render(request, "frontend/view.html", context)
