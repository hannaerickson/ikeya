steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL,
            username VARCHAR(200) PRIMARY KEY NOT NULL,
            hashed_password VARCHAR(200) NOT NULL,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
    [
        ## create the table
        """
        CREATE TABLE rooms (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            picture_url VARCHAR(256),
            username VARCHAR(200) NOT NULL REFERENCES accounts(username)
        );
        """,
        ## drop the table
        """
        DROP TABLE rooms;
        """,
    ],
    [
        ## create the table
        """
        CREATE TABLE furniture (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(256),
            room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE
        );
        """,
        ## drop the table
        """
        DROP TABLE furniture;
        """,
    ],
]
