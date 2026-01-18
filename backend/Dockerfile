FROM python:3.12

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN pip install poetry
RUN poetry config virtualenvs.create false

COPY pyproject.toml* poetry.lock* ./

RUN poetry install --no-root --no-interaction --no-ansi

COPY . .
