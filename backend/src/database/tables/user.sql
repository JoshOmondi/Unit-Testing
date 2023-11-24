CREATE TABLE Users (
    userID VARCHAR(100) PRIMARY KEY,
    userName VARCHAR(200),
    email VARCHAR(300) UNIQUE,
    cohortnumber VARCHAR(100),
    password VARCHAR(200)
);

DROP TABLE IF EXISTS Users;
