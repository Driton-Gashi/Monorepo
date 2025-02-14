CREATE TABLE users
  (
     id       INT auto_increment PRIMARY KEY,
     name     VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email    VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL
  ); 

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE foods (
  food_id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(300) NOT NULL,
  price FLOAT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

