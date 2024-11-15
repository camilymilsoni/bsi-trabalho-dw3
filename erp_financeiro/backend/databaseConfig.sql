CREATE DATABASE erp_financeiro;

\c erp_financeiro;

CREATE TABLE IF NOT EXISTS conta_corrente (
    contaid BIGSERIAL CONSTRAINT pk_contas PRIMARY KEY,
    num_conta VARCHAR(10) UNIQUE,
    nome_titular VARCHAR(80),
    saldo NUMERIC(15,2),
    data_abertura DATE,
    removido BOOLEAN DEFAULT false
);

INSERT INTO conta_corrente VALUES 
    (default, 'A001', 'João Silva', 1500.75, '2008-05-08'),
    (default, 'B010', 'Maria Oliveira', 2350.00, '2017-03-21'),
    (default, 'C184', 'Carlos Santos', 50.41, '2022-10-30')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS usuarios (
    usuarioid BIGSERIAL CONSTRAINT pk_usuarios PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password TEXT,
    removido BOOLEAN DEFAULT false
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios VALUES
    (default, 'admin', crypt('admin', gen_salt('bf'))), 
    (default, 'comum', crypt('comum', gen_salt('bf')))
ON CONFLICT DO NOTHING;