FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY routers routers
COPY queries queries
COPY models models
COPY tests tests

# If you're using a relational database with migrations,
# uncomment the following line
COPY migrations migrations

RUN pip install -r requirements.txt
#CMD uvicorn main:app --host 0.0.0.0 --port $PORT
CMD uvicorn main:app --host 0.0.0.0 --port 80

# If you're using a relational database and want migrations
# to be run automatically, delete the previous CMD line and
# uncomment this CMD line
#CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80
