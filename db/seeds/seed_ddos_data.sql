-- db/seeds/seed_ddos_data.sql
INSERT INTO ddos_data (timestamp, source_ip, destination_ip, detected) VALUES
('2023-04-01 10:00:00', '192.168.1.1', '192.168.1.2', true),
('2023-04-01 10:05:00', '192.168.1.3', '192.168.1.4', false);
