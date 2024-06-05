import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE address (
            id SERIAL PRIMARY KEY,
            id_city INTEGER NOT NULL,
            number_cep INTEGER NOT NULL,
            street VARCHAR(255) NOT NULL,
            neighborhood VARCHAR(255) NOT NULL,
            number INTEGER NOT NULL,
            complement VARCHAR(255),
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP,
            FOREIGN KEY (id_city) REFERENCES city (id) ON DELETE NO ACTION ON UPDATE CASCADE
        )
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP DATABASE address;
    `);
}
