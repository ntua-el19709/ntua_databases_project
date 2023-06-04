DROP DATABASE IF EXISTS libraries;
CREATE USER IF NOT EXISTS 'softenguser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
CREATE DATABASE libraries;
GRANT ALL PRIVILEGES ON libraries.* TO 'softenguser'@'localhost';

USE libraries;

CREATE TABLE school(
    school_id integer(10) NOT NULL auto_increment,
    school_name varchar(50) NOT NULL,
    address varchar(255) NOT NULL,
    city varchar(30) NOT NULL,
    telephone integer(20) NOT NULL,
    email varchar(30) NOT NULL,
    principal_fullname varchar(30) NOT NULL,
    PRIMARY KEY (school_id),
    CHECK (email NOT LIKE '% %' AND telephone>0)
);
CREATE INDEX school_index on school(school_id);

CREATE TABLE book(
	isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    title varchar(50) NOT NULL,
    publisher varchar(30) NOT NULL,
    pages integer(5) NOT NULL,
    summary varchar(255) NOT NULL,
    image binary(255),
    lang varchar(30) NOT NULL,
    copies integer(3) NOT NULL,
        CONSTRAINT book_of_school FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (isbn,school_id),
    CHECK (pages>0 AND copies>=0 AND CHAR_LENGTH(isbn)=10 
    AND (SUBSTRING(isbn,1,1) LIKE '0' OR SUBSTRING(isbn,1,1) LIKE '1' OR SUBSTRING(isbn,1,1) LIKE '2' OR SUBSTRING(isbn,1,1) LIKE '3' OR SUBSTRING(isbn,1,1) LIKE '4' OR SUBSTRING(isbn,1,1) LIKE '5' OR SUBSTRING(isbn,1,1) LIKE '6' OR SUBSTRING(isbn,1,1) LIKE '7' OR SUBSTRING(isbn,1,1) LIKE '8' OR SUBSTRING(isbn,1,1) LIKE '9')
    AND (SUBSTRING(isbn,2,1) LIKE '0' OR SUBSTRING(isbn,2,1) LIKE '1' OR SUBSTRING(isbn,2,1) LIKE '2' OR SUBSTRING(isbn,2,1) LIKE '3' OR SUBSTRING(isbn,2,1) LIKE '4' OR SUBSTRING(isbn,2,1) LIKE '5' OR SUBSTRING(isbn,2,1) LIKE '6' OR SUBSTRING(isbn,2,1) LIKE '7' OR SUBSTRING(isbn,2,1) LIKE '8' OR SUBSTRING(isbn,2,1) LIKE '9') 
    AND (SUBSTRING(isbn,3,1) LIKE '0' OR SUBSTRING(isbn,3,1) LIKE '1' OR SUBSTRING(isbn,3,1) LIKE '2' OR SUBSTRING(isbn,3,1) LIKE '3' OR SUBSTRING(isbn,3,1) LIKE '4' OR SUBSTRING(isbn,3,1) LIKE '5' OR SUBSTRING(isbn,3,1) LIKE '6' OR SUBSTRING(isbn,3,1) LIKE '7' OR SUBSTRING(isbn,3,1) LIKE '8' OR SUBSTRING(isbn,3,1) LIKE '9')
    AND (SUBSTRING(isbn,4,1) LIKE '0' OR SUBSTRING(isbn,4,1) LIKE '1' OR SUBSTRING(isbn,4,1) LIKE '2' OR SUBSTRING(isbn,4,1) LIKE '3' OR SUBSTRING(isbn,4,1) LIKE '4' OR SUBSTRING(isbn,4,1) LIKE '5' OR SUBSTRING(isbn,4,1) LIKE '6' OR SUBSTRING(isbn,4,1) LIKE '7' OR SUBSTRING(isbn,4,1) LIKE '8' OR SUBSTRING(isbn,4,1) LIKE '9')
    AND (SUBSTRING(isbn,5,1) LIKE '0' OR SUBSTRING(isbn,5,1) LIKE '1' OR SUBSTRING(isbn,5,1) LIKE '2' OR SUBSTRING(isbn,5,1) LIKE '3' OR SUBSTRING(isbn,5,1) LIKE '4' OR SUBSTRING(isbn,5,1) LIKE '5' OR SUBSTRING(isbn,5,1) LIKE '6' OR SUBSTRING(isbn,5,1) LIKE '7' OR SUBSTRING(isbn,5,1) LIKE '8' OR SUBSTRING(isbn,5,1) LIKE '9')
    AND (SUBSTRING(isbn,6,1) LIKE '0' OR SUBSTRING(isbn,6,1) LIKE '1' OR SUBSTRING(isbn,6,1) LIKE '2' OR SUBSTRING(isbn,6,1) LIKE '3' OR SUBSTRING(isbn,6,1) LIKE '4' OR SUBSTRING(isbn,6,1) LIKE '5' OR SUBSTRING(isbn,6,1) LIKE '6' OR SUBSTRING(isbn,6,1) LIKE '7' OR SUBSTRING(isbn,6,1) LIKE '8' OR SUBSTRING(isbn,6,1) LIKE '9')
    AND (SUBSTRING(isbn,7,1) LIKE '0' OR SUBSTRING(isbn,7,1) LIKE '1' OR SUBSTRING(isbn,7,1) LIKE '2' OR SUBSTRING(isbn,7,1) LIKE '3' OR SUBSTRING(isbn,7,1) LIKE '4' OR SUBSTRING(isbn,7,1) LIKE '5' OR SUBSTRING(isbn,7,1) LIKE '6' OR SUBSTRING(isbn,7,1) LIKE '7' OR SUBSTRING(isbn,7,1) LIKE '8' OR SUBSTRING(isbn,7,1) LIKE '9') 
    AND (SUBSTRING(isbn,8,1) LIKE '0' OR SUBSTRING(isbn,8,1) LIKE '1' OR SUBSTRING(isbn,8,1) LIKE '2' OR SUBSTRING(isbn,8,1) LIKE '3' OR SUBSTRING(isbn,8,1) LIKE '4' OR SUBSTRING(isbn,8,1) LIKE '5' OR SUBSTRING(isbn,8,1) LIKE '6' OR SUBSTRING(isbn,8,1) LIKE '7' OR SUBSTRING(isbn,8,1) LIKE '8' OR SUBSTRING(isbn,8,1) LIKE '9')
    AND (SUBSTRING(isbn,9,1) LIKE '0' OR SUBSTRING(isbn,9,1) LIKE '1' OR SUBSTRING(isbn,9,1) LIKE '2' OR SUBSTRING(isbn,9,1) LIKE '3' OR SUBSTRING(isbn,9,1) LIKE '4' OR SUBSTRING(isbn,9,1) LIKE '5' OR SUBSTRING(isbn,9,1) LIKE '6' OR SUBSTRING(isbn,9,1) LIKE '7' OR SUBSTRING(isbn,9,1) LIKE '8' OR SUBSTRING(isbn,9,1) LIKE '9')
    AND (SUBSTRING(isbn,10,1) LIKE '0' OR SUBSTRING(isbn,10,1) LIKE '1' OR SUBSTRING(isbn,10,1) LIKE '2' OR SUBSTRING(isbn,10,1) LIKE '3' OR SUBSTRING(isbn,10,1) LIKE '4' OR SUBSTRING(isbn,10,1) LIKE '5' OR SUBSTRING(isbn,10,1) LIKE '6' OR SUBSTRING(isbn,10,1) LIKE '7' OR SUBSTRING(isbn,10,1) LIKE '8' OR SUBSTRING(isbn,10,1) LIKE '9' OR SUBSTRING(isbn,10,1) LIKE 'X'))
);
CREATE INDEX book_index on book(isbn,school_id);

CREATE TABLE author(
	author_id integer(10) NOT NULL auto_increment,
    author_fullname varchar(30) NOT NULL UNIQUE,
    PRIMARY KEY (author_id)
);
CREATE INDEX author_index on author(author_id);

CREATE TABLE book_author(
	isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
	author_id integer(10) NOT NULL,
		CONSTRAINT book_written_by FOREIGN KEY (isbn, school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT author_wrote FOREIGN KEY (author_id)
        REFERENCES author(author_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (isbn,school_id,author_id)
);
CREATE INDEX book_author_index on book_author(author_id);

CREATE TABLE category(
	category_id integer(10) NOT NULL auto_increment,
    category_name varchar(30) NOT NULL UNIQUE,
    PRIMARY KEY (category_id)
);
CREATE INDEX category_index on category(category_id);

CREATE TABLE book_category(
	isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
	category_id integer(10) NOT NULL,
		CONSTRAINT book_written FOREIGN KEY (isbn, school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT category_of_book FOREIGN KEY (category_id)
        REFERENCES category(category_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (isbn,school_id,category_id)
);
CREATE INDEX book_category_index on book_category(category_id);

CREATE TABLE users(
	user_id integer(10) NOT NULL auto_increment,
    username varchar(30) NOT NULL UNIQUE,
    passwrd varchar(30) NOT NULL,
    user_fullname varchar(30) NOT NULL,
    date_of_birth date NOT NULL,
    approved boolean NOT NULL,
    PRIMARY KEY (user_id),
    CHECK (date_of_birth< date '2015-01-01')
);
CREATE INDEX users_index on users(user_id);

CREATE TABLE top_operator(
	user_id integer(10) NOT NULL,
		CONSTRAINT is_topop FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id)
);

CREATE TABLE operator(
	user_id integer(10) NOT NULL,
    school_id integer(10) NOT NULL,
		CONSTRAINT is_op FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT op_of_school FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id)
);
CREATE INDEX operator_index on operator(user_id);

CREATE TABLE professor(
	user_id integer(10) NOT NULL,
    school_id integer(10) NOT NULL,
		CONSTRAINT is_prof FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT prof_of_school FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id)
);
CREATE INDEX professor_index on professor(user_id);

CREATE TABLE student(
	user_id integer(10) NOT NULL,
    school_id integer(10) NOT NULL,
		CONSTRAINT is_student FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT student_of_school FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id)
);
CREATE INDEX student_index on student(user_id);

CREATE TABLE rental(
	rental_id integer(10) NOT NULL auto_increment,
    user_id integer(10) NOT NULL,
    isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    returned boolean NOT NULL,
    rental_datetime timestamp NOT NULL,
		CONSTRAINT person_who_rent FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT book_rent FOREIGN KEY (isbn,school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (rental_id)
);
CREATE INDEX rental_index on rental(rental_id);

CREATE TABLE reservation(
	reservation_id integer(10) NOT NULL auto_increment,
    user_id integer(10) NOT NULL,
    isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    isold boolean NOT NULL,
    reservation_datetime timestamp NOT NULL,
		CONSTRAINT person_who_reserved FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT book_resrved FOREIGN KEY (isbn,school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (reservation_id)
);
CREATE INDEX reservation_index on reservation(reservation_id);

CREATE TABLE review(
	review_id integer(10) NOT NULL auto_increment,
    user_id integer(10) NOT NULL,
    isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    likert integer(1) NOT NULL,
    description varchar(255),
    approved bit NOT NULL,
		CONSTRAINT person_who_reviewed FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT book_reviewed FOREIGN KEY (isbn,school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (review_id),
    CHECK (likert>=1 AND likert<=5)
);
CREATE INDEX review_index on review(review_id);

insert into users (username,passwrd,user_fullname,date_of_birth,approved)
values ('topoperator','password','TOP OPERATOR',DATE '2000-01-01',true);
insert into top_operator values ((select user_id from users where username = 'topoperator'));