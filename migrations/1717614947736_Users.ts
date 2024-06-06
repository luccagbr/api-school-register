import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            id_person INTEGER NOT NULL,
            created_by INTEGER,
            login VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            token_login VARCHAR(255),
            token_recover_password VARCHAR(255),
            is_first_password BOOLEAN DEFAULT TRUE,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP,
            FOREIGN KEY (id_person) REFERENCES people (id) ON DELETE NO ACTION ON UPDATE CASCADE,
            FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE CASCADE
        );

        INSERT INTO user (id_person, login, password)
        VALUES 
            ((SELECT id FROM people WHERE email = 'luccavitalc@gmail.com'), (SELECT email FROM people WHERE email = 'luccavitalc@gmail.com'), '123456');

        UPDATE user SET created_by = (SELECT id FROM user WHERE login = 'luccavitalc@gmail.com')
        WHERE login = 'luccavitalc@gmail.com';

        ALTER TABLE user
            ALTER COLUMN created_by SET NOT NULL;
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE users;
    `);
}
