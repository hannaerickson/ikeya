steps = [
    [
        ## create the table
        """
        CREATE TABLE rooms (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT
            picture_url VARCHAR(256)
        );
        """,
        ## drop the table
        """
        DROP TABLE room;
        """
    ]
]
