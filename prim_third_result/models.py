from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class prim_third_result(models.Model):
    session_name = models.CharField(max_length=200)
    section_name = models.CharField(max_length=200)
    class_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    middle_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    gender = models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=200)
    date_of_birth = models.DateField()
    passport = models.ImageField(max_length = 100)
    full_name = models.CharField(max_length=200, null=True, blank=True)
    agricultural_science_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    agricultural_science_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    agricultural_science_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    agricultural_science_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    agricultural_science_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    agricultural_science_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    agricultural_science_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    chess_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    chess_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    chess_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    chess_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    chess_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    chess_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    chess_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    christian_religious_knowledge_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    christian_religious_knowledge_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    christian_religious_knowledge_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    christian_religious_knowledge_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    christian_religious_knowledge_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    christian_religious_knowledge_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    christian_religious_knowledge_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    citizenship_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    citizenship_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    citizenship_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    citizenship_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    citizenship_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    citizenship_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    citizenship_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    computer_studies_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    computer_studies_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    computer_studies_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    computer_studies_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    computer_studies_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    computer_studies_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    computer_studies_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    french_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    french_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    french_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    french_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    french_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    french_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    french_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    geography_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    geography_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    geography_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    geography_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    geography_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    geography_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    geography_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    history_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    history_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    history_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    history_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    history_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    history_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    history_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    home_economics_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    home_economics_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    home_economics_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    home_economics_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    home_economics_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    home_economics_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    home_economics_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    ict_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    ict_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    ict_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    ict_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    ict_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    ict_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    ict_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    literacy_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    literacy_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    literacy_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    literacy_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    literacy_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    literacy_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    literacy_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    moral_instruction_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    moral_instruction_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    moral_instruction_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    moral_instruction_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    moral_instruction_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    moral_instruction_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    moral_instruction_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    music_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    music_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    music_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    music_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    music_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    music_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    music_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    numeracy_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    numeracy_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    numeracy_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    numeracy_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    numeracy_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    numeracy_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    numeracy_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    physical_and_health_education_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    physical_and_health_education_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    physical_and_health_education_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    physical_and_health_education_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    physical_and_health_education_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    physical_and_health_education_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    physical_and_health_education_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    quantitative_reasoning_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    quantitative_reasoning_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    quantitative_reasoning_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    quantitative_reasoning_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    quantitative_reasoning_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    quantitative_reasoning_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    quantitative_reasoning_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    science_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    science_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    science_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    science_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    science_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    science_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    science_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    scrabble_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    scrabble_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    scrabble_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    scrabble_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    scrabble_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    scrabble_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    scrabble_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    social_studies_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    social_studies_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    social_studies_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    social_studies_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    social_studies_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    social_studies_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    social_studies_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    spelling_bee_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    spelling_bee_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    spelling_bee_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    spelling_bee_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    spelling_bee_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    spelling_bee_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    spelling_bee_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    verbal_reasoning_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    verbal_reasoning_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    verbal_reasoning_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    verbal_reasoning_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    verbal_reasoning_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    verbal_reasoning_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    verbal_reasoning_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    vocational_studies_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    vocational_studies_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    vocational_studies_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    vocational_studies_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    vocational_studies_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    vocational_studies_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    vocational_studies_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    yoruba_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    yoruba_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    yoruba_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    yoruba_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    yoruba_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    yoruba_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    yoruba_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    creative_art_ca_1 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    creative_art_ca_2 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    creative_art_ca_3 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    creative_art_ca_4 = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    creative_art_ca_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(40)], default=0)
    creative_art_exam = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(60)], default=0)
    creative_art_total = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    teacher_comment = models.CharField(max_length=200, null=True, blank=True)
    headteacher_comment = models.CharField(max_length=200, null=True, blank=True)
    total_scores = models.IntegerField(null=True, blank=True)
    totl_average = models.DecimalField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)], decimal_places=2, max_digits=7)
    psychomotor_punctuality = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_mental_alertness = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_respect = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_neatness = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_politeness = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_honesty = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_relationship_with_peers = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_willingness_to_learn = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_spirit_of_teamwork = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_health = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_verbal_skill = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_participation_in_games_and_sports = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_artistic_creativity = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_musical_skills = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    psychomotor_dance_skills = models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=200, null=True, blank=True)
    admission_no = models.CharField(null=True, blank=True, max_length=200)
    
    def __str__(self):
        return self.full_name
        
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['session_name', 'section_name', 'class_name', 'first_name', 'middle_name', 'last_name', 'date_of_birth', 'gender', 'passport', 'full_name'], name='unique_prim_third_result')
        ]