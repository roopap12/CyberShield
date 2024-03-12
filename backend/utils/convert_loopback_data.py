import csv
import json

# Define the input and output file names
input_file = 'C:/Users/PatelR/Desktop/CyberSecurity Personal Projects/CyberShield/backend/data/loopback_data.txt'
output_file = 'loopback_data.json'

# Open the input file for reading
with open(input_file, 'r', encoding='utf-16') as infile:
    # Open the output file for writing
    with open(output_file, 'w') as outfile:
        # Initialize an empty list to hold the records
        records = []
        
        # Use the csv module to read the input file
        # Specify the delimiter as a tab character since your data seems to be tab-separated
        reader = csv.reader(infile, delimiter='\t')
        
        # Iterate over each row in the input file
        for row in reader:
            # Create a dictionary for the current record
            # Use a default value for missing fields
            record = {
                'timestamp': row[0] if len(row) > 0 else 'N/A',
                'detected': row[1] == 'true' if len(row) > 1 else 'N/A',
                'sourceIP': row[2] if len(row) > 2 else 'N/A',
                'destinationIP': row[3] if len(row) > 3 else 'N/A',
                'attackType': row[4] if len(row) > 4 else 'N/A',
                'trafficVolume': int(row[5]) if len(row) > 5 else 'N/A'
            }
            # Append the record to the list
            records.append(record)
        
        # Write the list of records to the output file in JSON format
        json.dump(records, outfile, indent=4)

print(f"Data converted and saved to {output_file}")
