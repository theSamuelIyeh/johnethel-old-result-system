# Generated by Django 3.1.7 on 2021-04-28 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='nur_second_result',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_name', models.CharField(max_length=200)),
                ('section_name', models.CharField(max_length=200)),
                ('class_name', models.CharField(max_length=200)),
                ('first_name', models.CharField(max_length=200)),
                ('middle_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=200)),
                ('date_of_birth', models.DateField()),
                ('passport', models.ImageField(upload_to='')),
                ('full_name', models.CharField(max_length=200, null=True)),
                ('emotional_skills_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('emotional_skills_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('Rhymes_and_songs_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('gross_motor_skills_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('fine_motor_skills_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('information_and_communication_technology_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('social_skills_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('numeracy_first_question_first_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_first_question_end_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_second_question_first_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_second_question_end_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_third_question_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_fourth_question_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_fifth_question_first_input', models.CharField(blank=True, max_length=200, null=True)),
                ('numeracy_fifth_question_end_input', models.CharField(blank=True, max_length=200, null=True)),
                ('writing_skills_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('writing_skills_first_question_first_input', models.CharField(blank=True, max_length=200, null=True)),
                ('writing_skills_first_question_end_input', models.CharField(blank=True, max_length=200, null=True)),
                ('writing_skills_second_question_first_input', models.CharField(blank=True, max_length=200, null=True)),
                ('writing_skills_second_question_end_input', models.CharField(blank=True, max_length=200, null=True)),
                ('literacy_question_1', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_2', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_3', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_4', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_5', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_6', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_7', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_8', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_9', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_10', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_11', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_12', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_13', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('literacy_question_14', models.CharField(blank=True, choices=[('A', 'Honour Roll'), ('B', 'Super Effort'), ('C', 'Improving'), ('D', 'Working at it')], max_length=200, null=True)),
                ('teacher_comment', models.CharField(blank=True, max_length=200, null=True)),
                ('headteacher_comment', models.CharField(blank=True, max_length=200, null=True)),
                ('admission_no', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.AddConstraint(
            model_name='nur_second_result',
            constraint=models.UniqueConstraint(fields=('session_name', 'section_name', 'class_name', 'first_name', 'middle_name', 'last_name', 'date_of_birth', 'gender', 'passport', 'full_name'), name='unique_nur_second_result'),
        ),
    ]
