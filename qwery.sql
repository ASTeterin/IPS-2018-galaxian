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

CREATE TABLE result
(
    result_id SERIAL,
    user_id BIGINT,
    game_date DATE,
    scores INT
) ENGINE INNODB DEFAULT CHARSET = UTF8;

INSERT INTO result 
(user_id, game_date, scores)
VALUES
(8, '2018-12-21', 1140);
(6, '2018-12-20', 900),
(1, '2018-12-22', 890);

SELECT users.user_name, result.game_date, result.scores
FROM users
INNER JOIN result USING (user_id)
ORDER BY result.scores DESC;
