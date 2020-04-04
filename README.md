TO run the project:

You must have following installed in your system:

NodeJS
Python 3.6 or above
Postgres

Set up Database:
Create a database in your postgres and replace the NAME with your db name.

Inside docs_project>mysite>settings.py
	DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': <Your_DB_NAME>,
        'USER': <Your_USER_NAME>,
        'PASSWORD': <Your_PASSWOR>,
        'HOST': 'localhost',
        'PORT': '',
    }


Install dependencies:
In your project root
	npm install
	pip install requirements.txt

Start project:
1. python socketconnection\connectdemo.py 
2. npm run build
3. python manage.py runserver
