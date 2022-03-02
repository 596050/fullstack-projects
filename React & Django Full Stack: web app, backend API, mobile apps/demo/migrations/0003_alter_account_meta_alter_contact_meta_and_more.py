# Generated by Django 4.0.3 on 2022-03-02 20:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('demo', '0002_meta_person_user_contact_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='meta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='demo.meta'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='meta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='demo.meta'),
        ),
        migrations.AlterField(
            model_name='person',
            name='meta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='demo.meta'),
        ),
        migrations.AlterField(
            model_name='user',
            name='meta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='demo.meta'),
        ),
    ]
