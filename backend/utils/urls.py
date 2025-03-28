from django.urls import path

from . import views

urlpatterns = [
    path("pinyin_num_to_tone", views.pinyin_num_to_tone),
    path("lemmatizer/lemmas", views.get_lemmas),
    path("lemmatizer/lemma", views.get_lemma),
]
