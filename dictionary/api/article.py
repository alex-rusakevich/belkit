from django.db.models import Q
from rest_framework import serializers, viewsets
from rest_framework.response import Response

from dictionary.models import Article


# Serializers define the API representation.
class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "pronunciation", "body"]


# ViewSets define the view behavior.
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def list(self, request):
        queryset = self.queryset
        serializer_context = {
            "request": request,
        }

        if "query" in request.GET:
            user_query = request.GET["query"].strip()

            queryset = queryset.filter(
                Q(title__icontains=user_query) | Q(body__icontains=user_query)
            )

        serializer = ArticleSerializer(queryset, context=serializer_context, many=True)
        return Response(serializer.data)
