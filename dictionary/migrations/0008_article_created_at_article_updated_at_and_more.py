# Generated by Django 4.2 on 2025-01-26 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0007_alter_article_direction'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='example',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='example',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='direction',
            field=models.CharField(choices=[('BZ', 'Бел-кіт'), ('ZB', 'Кіт-бел')], default='BZ', max_length=2, verbose_name='Напрамак перакладу'),
        ),
    ]