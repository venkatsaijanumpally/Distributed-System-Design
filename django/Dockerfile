# Use Alpine Linux as the base image
FROM python:3.9.2-alpine3.13

# Install system dependencies
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add bash

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install django-cors-headers
RUN pip install djangorestframework

# Copy the application code into the container
COPY ./django_project /app/django_project
COPY ./entryscript.sh /app/entryscript.sh

# Set executable permissions for the entry script
RUN chmod +x /app/entryscript.sh

# Expose port 8000
EXPOSE 8000

CMD ["sh", "./entryscript.sh"]