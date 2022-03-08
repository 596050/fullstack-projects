FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

RUN mkdir /code

WORKDIR /code

COPY ./requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN adduser -D user

RUN chown -R user .

USER user
