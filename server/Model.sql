CREATE TABLE users
  (
     id       INT auto_increment PRIMARY KEY,
     name     VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email    VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     address VARCHAR(255),
     city VARCHAR(50),
     phone VARCHAR(50)
  ); 
  -- Add this later
  -- ALTER TABLE `users` ADD `role` SET('admin', 'client') NOT NULL DEFAULT 'client' AFTER `email`;

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

  CREATE TABLE orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      name VARCHAR(255),
      email VARCHAR(255),
      address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      extra TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      food_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (food_id) REFERENCES foods(food_id) ON DELETE CASCADE,
      UNIQUE (order_id, food_id)
  );