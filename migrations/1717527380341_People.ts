import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TYPE gender_enum AS ENUM ('Masculino', 'Feminino');

        CREATE TYPE marital_status_enum AS ENUM ('Solteiro(a)', 'Casado(a)', 'Viuvo(a)', 'Divorciado(a)');
    
        CREATE TABLE IF NOT EXISTS people (
            id SERIAL PRIMARY KEY,
            id_address INTEGER,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            document_cpf VARCHAR(12) NOT NULL,
            document_rg VARCHAR(10),
            gender gender_enum NOT NULL,
            marital_status marital_status_enum NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP,
            FOREIGN KEY (id_address) REFERENCES addresses (id) ON DELETE NO ACTION ON UPDATE CASCADE
        );

        INSERT INTO people (name, email, document_cpf, gender, marital_status)
        VALUES
            ('Developer', 'lgctech7@gmail.com', '02065105607', 'Masculino', 'Solteiro(a)');
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE people;
        DROP TYPE gender_enum;
        DROP TYPE marital_status_enum;
    `);
}
