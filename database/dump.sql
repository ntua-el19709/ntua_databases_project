/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: author
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `author` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_fullname` varchar(30) NOT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `author_fullname` (`author_fullname`),
  KEY `author_index` (`author_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book` (
  `isbn` char(10) NOT NULL,
  `school_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `publisher` varchar(30) NOT NULL,
  `pages` int NOT NULL,
  `summary` varchar(255) NOT NULL,
  `image` binary(255) DEFAULT NULL,
  `lang` varchar(30) NOT NULL,
  `copies` int NOT NULL,
  PRIMARY KEY (`isbn`, `school_id`),
  KEY `book_of_school` (`school_id`),
  KEY `book_index` (`isbn`, `school_id`),
  CONSTRAINT `book_of_school` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_chk_1` CHECK (
  (
    (`pages` > 0)
    and (`copies` >= 0)
    and (char_length(`isbn`) = 10)
    and (
    (substr(`isbn`, 1, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 1, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 2, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 2, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 3, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 3, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 4, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 4, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 5, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 5, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 6, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 6, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 7, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 7, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 8, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 8, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 9, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 9, 1) like _utf8mb4 '9')
    )
    and (
    (substr(`isbn`, 10, 1) like _utf8mb4 '0')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '1')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '2')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '3')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '4')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '5')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '6')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '7')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '8')
    or (substr(`isbn`, 10, 1) like _utf8mb4 '9')
    or (substr(`isbn`, 10, 1) like _utf8mb4 'X')
    )
  )
  )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_author
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_author` (
  `isbn` char(10) NOT NULL,
  `school_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`isbn`, `school_id`, `author_id`),
  KEY `book_author_index` (`author_id`),
  CONSTRAINT `author_wrote` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_written_by` FOREIGN KEY (`isbn`, `school_id`) REFERENCES `book` (`isbn`, `school_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_category
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_category` (
  `isbn` char(10) NOT NULL,
  `school_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`isbn`, `school_id`, `category_id`),
  KEY `book_category_index` (`category_id`),
  CONSTRAINT `book_written` FOREIGN KEY (`isbn`, `school_id`) REFERENCES `book` (`isbn`, `school_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_of_book` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: category
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(30) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`),
  KEY `category_index` (`category_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: operator
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `operator` (
  `user_id` int NOT NULL,
  `school_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `op_of_school` (`school_id`),
  KEY `operator_index` (`user_id`),
  CONSTRAINT `is_op` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `op_of_school` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: professor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `professor` (
  `user_id` int NOT NULL,
  `school_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `prof_of_school` (`school_id`),
  KEY `professor_index` (`user_id`),
  CONSTRAINT `is_prof` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prof_of_school` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rental
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `rental` (
  `rental_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `isbn` char(10) NOT NULL,
  `school_id` int NOT NULL,
  `returned` tinyint(1) NOT NULL,
  `rental_datetime` timestamp NOT NULL,
  PRIMARY KEY (`rental_id`),
  KEY `person_who_rent` (`user_id`),
  KEY `book_rent` (`isbn`, `school_id`),
  KEY `rental_index` (`rental_id`),
  CONSTRAINT `book_rent` FOREIGN KEY (`isbn`, `school_id`) REFERENCES `book` (`isbn`, `school_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `person_who_rent` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: reservation
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `reservation` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `isbn` char(10) NOT NULL,
  `school_id` int NOT NULL,
  `isold` tinyint(1) NOT NULL,
  `reservation_datetime` timestamp NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `person_who_reserved` (`user_id`),
  KEY `book_resrved` (`isbn`, `school_id`),
  KEY `reservation_index` (`reservation_id`),
  CONSTRAINT `book_resrved` FOREIGN KEY (`isbn`, `school_id`) REFERENCES `book` (`isbn`, `school_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `person_who_reserved` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: review
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `isbn` char(10) NOT NULL,
  `school_id` int NOT NULL,
  `likert` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `approved` bit(1) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `person_who_reviewed` (`user_id`),
  KEY `book_reviewed` (`isbn`, `school_id`),
  KEY `review_index` (`review_id`),
  CONSTRAINT `book_reviewed` FOREIGN KEY (`isbn`, `school_id`) REFERENCES `book` (`isbn`, `school_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `person_who_reviewed` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_chk_1` CHECK (
  (
    (`likert` >= 1)
    and (`likert` <= 5)
  )
  )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: school
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `school` (
  `school_id` int NOT NULL AUTO_INCREMENT,
  `school_name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL,
  `telephone` int NOT NULL,
  `email` varchar(30) NOT NULL,
  `principal_fullname` varchar(30) NOT NULL,
  PRIMARY KEY (`school_id`),
  KEY `school_index` (`school_id`),
  CONSTRAINT `school_chk_1` CHECK (
  (
    (not((`email` like _utf8mb4 '% %')))
    and (`telephone` > 0)
  )
  )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: student
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `student` (
  `user_id` int NOT NULL,
  `school_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `student_of_school` (`school_id`),
  KEY `student_index` (`user_id`),
  CONSTRAINT `is_student` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_of_school` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: top_operator
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `top_operator` (
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `is_topop` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `passwrd` varchar(30) NOT NULL,
  `user_fullname` varchar(30) NOT NULL,
  `date_of_birth` date NOT NULL,
  `approved` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  KEY `users_index` (`user_id`),
  CONSTRAINT `users_chk_1` CHECK ((`date_of_birth` < DATE '2015-01-01'))
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: author
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_author
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_category
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: category
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: operator
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: professor
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rental
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: reservation
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: review
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: school
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: student
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: top_operator
# ------------------------------------------------------------

INSERT INTO
  `top_operator` (`user_id`)
VALUES
  (1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `user_id`,
    `username`,
    `passwrd`,
    `user_fullname`,
    `date_of_birth`,
    `approved`
  )
VALUES
  (
    1,
    'topoperator',
    'password',
    'TOP OPERATOR',
    '2000-01-01',
    1
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
