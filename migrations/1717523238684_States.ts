import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE IF NOT EXISTS states (
            id SERIAL PRIMARY KEY,
            id_region INTEGER NOT NULL,
            abbreviation VARCHAR NOT NULL,
            name VARCHAR NOT NULL,
            FOREIGN KEY (id_region) REFERENCES regions (id) ON DELETE NO ACTION ON UPDATE CASCADE
        );

        INSERT INTO states (id, id_region, name, abbreviation) VALUES
            (11, 1, 'Rondônia', 'RO'),
            (12, 1, 'Acre', 'AC'),
            (13, 1, 'Amazonas', 'AM'),
            (14, 1, 'Roraima', 'RR'),
            (15, 1, 'Pará', 'PA'),
            (16, 1, 'Amapá', 'AP'),
            (17, 1, 'Tocantins', 'TO'),
            (21, 2, 'Maranhão', 'MA'),
            (22, 2, 'Piauí', 'PI'),
            (23, 2, 'Ceará', 'CE'),
            (24, 2, 'Rio Grande do Norte', 'RN'),
            (25, 2, 'Paraíba', 'PB'),
            (26, 2, 'Pernambuco', 'PE'),
            (27, 2, 'Alagoas', 'AL'),
            (28, 2, 'Sergipe', 'SE'),
            (29, 2, 'Bahia', 'BA'),
            (31, 3, 'Minas Gerais', 'MG'),
            (32, 3, 'Espírito Santo', 'ES'),
            (33, 3, 'Rio de Janeiro', 'RJ'),
            (35, 3, 'São Paulo', 'SP'),
            (41, 4, 'Paraná', 'PR'),
            (42, 4, 'Santa Catarina', 'SC'),
            (43, 4, 'Rio Grande do Sul', 'RS'),
            (50, 5, 'Mato Grosso do Sul', 'MS'),
            (51, 5, 'Mato Grosso', 'MT'),
            (52, 5, 'Goiás', 'GO'),
            (53, 5, 'Distrito Federal', 'DF');
            ALTER SEQUENCE states_id_seq RESTART WITH 54;
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(
        `
            DROP TABLE states;
        `,
    );
}
