CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    features TEXT,
    price TEXT NOT NULL,
    stars INT NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    class VARCHAR(255) NOT NULL,
    flight_time VARCHAR(255) NOT NULL,
    from_place VARCHAR(255) NOT NULL,
    from_time VARCHAR(255) NOT NULL,
    to_place VARCHAR(255) NOT NULL,
    to_time VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    airways VARCHAR(255) NOT NULL
);
