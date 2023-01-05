steps = [
     [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE users;
        """
    ],
    [
        ## create the table
        """
        CREATE TABLE rooms (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            picture_url VARCHAR(256),
            user_id INT NOT NULL REFERENCES users(id)
        );
        """,
        ## drop the table
        """
        DROP TABLE rooms;
        """
    ],
    [
        ## create the table
        """
        CREATE TABLE furniture (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(256),
            room_id INT NOT NULL REFERENCES rooms(id)
        );
        """,
        ## drop the table
        """
        DROP TABLE furniture;
        """
    ]

]
