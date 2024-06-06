import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE system_configs (
            id SERIAL PRIMARY KEY,
            variable VARCHAR(255) NOT NULL,
            value VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP
        );

        INSERT INTO system_configs (variable, value)
        VALUES 
            ('GROUP_ADMIN', (SELECT id FROM access_groups WHERE name = 'Administrador'));
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE system_configs;
    `);
}
