# Generated by Django 5.0.6 on 2024-07-05 12:57

import reviews.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_remove_review_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='image',
            field=models.ImageField(blank=True, upload_to=reviews.models.upload_filepath),
        ),
    ]
