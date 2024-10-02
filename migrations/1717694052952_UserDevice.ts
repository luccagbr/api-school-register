import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE IF NOT EXISTS user_devices (
            id SERIAL PRIMARY KEY,
            id_user INTEGER NOT NULL,
            architecture VARCHAR(120) NOT NULL,
            operating_system VARCHAR(255) NOT NULL,
            browser VARCHAR(255),
            ip_address VARCHAR(40),
            code_access VARCHAR(6) NOT NULL,
            confirm_code_access VARCHAR(6),
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE CASCADE
        );
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE user_devices;
    `);
}
