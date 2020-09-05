Description: 
A CRUD application that can register and login users.This application shows all the usres that are currently online and viewing or reading the article. We can see the avatars of all the users with their details and history of the offline users.
This project is based on Django and ReactJS(recompose).

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


	1.npm install
	2.pip install requirements.txt

Start project:
1. python socketconnection\connectdemo.py 
2. npm run buil
3. python manage.py runserver
