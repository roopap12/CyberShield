-- db/migrations/create_ddos_data_table.sql
CREATE TABLE ddos_data (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL,
  source_ip VARCHAR(15) NOT NULL,
  destination_ip VARCHAR(15) NOT NULL,
  detected BOOLEAN NOT NULL
);
