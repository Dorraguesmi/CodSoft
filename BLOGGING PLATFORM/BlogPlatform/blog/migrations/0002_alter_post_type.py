# Generated by Django 4.2.11 on 2024-06-27 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='type',
            field=models.IntegerField(choices=[(0, 'Travel'), (1, 'Thinking'), (2, 'Other')]),
        ),
    ]
