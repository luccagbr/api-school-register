import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE user_access_groups (
            id SERIAL PRIMARY KEY,
            id_user INTEGER NOT NULL,
            id_access_group INTEGER NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE CASCADE
        );

        INSERT INTO user_access_groups (id_user, id_access_group)
        VALUES 
            ((SELECT id FROM users WHERE login = 'luccavitalc@gmail.com'), (SELECT id FROM access_groups WHERE name = 'Administrador'));
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE user_access_groups;
    `);
}
