FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

COPY ./requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

RUN mkdir /api
COPY ./api /api

RUN mkdir /contacts
COPY ./contacts /contacts

COPY ./manage.py /manage.py

RUN adduser -D user
USER user

RUN ls

RUN python3 manage.py makemigrations && python3 manage.py migrate
RUN python3 manage.py createsuperuser
RUN python3 manage.py runserver 0.0.0.0:8000