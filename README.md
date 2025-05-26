# Monde de Dev Application

This is an exercice project for Openclassroom's Java and Angular formation.
It's the minimal viable product of a social network for developpers.
I implemented this app following a list of fonctionnalities for the back, and wireframes for the UI design.


This project uses : 
Java 21 with Maven, and Spring Boot 3 for the Backend 
Angular 19 for the Frontend 

## Start the project :

Git clone:

    git clone https://github.com/Shikizzz/P6-mdd.git

## Database initialization :

If you don't already have MySql, follow this guide : https://dev.mysql.com/doc/mysql-getting-started/en/

In your terminal, type these commands :

> mysql -u username -p password       (MySql connection)

> CREATE DATABASE mdd 

The tables will be created automatically on backend run, thanks to the property spring.jpa.hibernate.ddl-auto 

## Run project :

In your terminal, go to the Back folder and use these commands:

> mvn clean install 

> mvn spring-boot:run 

Then go to the MDD_front folder and use these commands:

> npm install

> ng serve
