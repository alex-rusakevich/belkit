# Generated by Django 5.1.1 on 2024-09-20 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dictionary", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="article",
            name="pinyin",
            field=models.CharField(blank=True, default=None, max_length=512, null=True),
        ),
    ]
