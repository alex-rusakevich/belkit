from django.db.models import Q
from rest_framework import serializers, viewsets
from rest_framework.response import Response

from dictionary.models import Example


# Serializers define the API representation.
class ExampleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Example
        fields = ["id", "body_be", "body_zh"]


# ViewSets define the view behavior.
class ExampleViewSet(viewsets.ModelViewSet):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

    def list(self, request):
        queryset = self.queryset
        serializer_context = {
            "request": request,
        }

        if "query" in request.GET:
            user_query = request.GET["query"].strip()

            queryset = queryset.filter(
                Q(body_be__contains=user_query) | Q(body_zh__contains=user_query)
            )

        serializer = ExampleSerializer(queryset, context=serializer_context, many=True)
        return Response(serializer.data)
