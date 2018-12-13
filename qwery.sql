CREATE TABLE users 
(
    user_id SERIAL;
    user_name VARCHAR(255);
    user_password VARCHAR(255);
    registration_date DATE; 
) ENGINE INNODB DEFAULT CHARSET = UTF8;


$qweryString = "CREATE TABLE users 
(
    user_id SERIAL,
    user_name VARCHAR(255),
    user_password VARCHAR(255),
    registration_date DATE
) ENGINE INNODB DEFAULT CHARSET = UTF8;";

$qwery = "show databases";

$result = dbQuery($qweryString);
echo $result;

INSERT INTO users
(user_name, user_password, registration_date)
VALUES
()