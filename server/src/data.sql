-- How your data base(POSTGRES) schema will look like, whether you set it locally or using external database(NeonDB,Aiven,Suprabase etc)?

CREATE DATABASE tododb;

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(30),
    description VARCHAR(300)
);
