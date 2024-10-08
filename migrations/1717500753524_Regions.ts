import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE IF NOT EXISTS regions(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
        );

        INSERT INTO regions (name)
        VALUES
            ('Norte'),
            ('Nordeste'),
            ('Sudeste'),
            ('Sul'),
            ('Centro-Oeste');
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE regions;
    `);
}
