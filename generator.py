import csv
from datetime import datetime, timedelta
import random
import uuid
# Function to generate a random filename


def generate_filename():
    return f"abc-{random.randint(1000, 9999)}.txt"

# Function to generate a random date within a specific range


def generate_uuid():
    return uuid.uuid4()


def generate_random_date(start_date, end_date):
    return start_date + timedelta(
        days=random.randint(0, (end_date - start_date).days)
    )


# Specify the date range for the data
start_date = datetime(2022, 1, 1)
end_date = datetime(2022, 12, 31)

# Generate random data for 100 rows
data = [(generate_uuid(), generate_filename(), generate_random_date(
    start_date, end_date)) for _ in range(1000)]


# Write the data to a CSV file
csv_file_path = 'random_data.csv'
with open(csv_file_path, 'w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    # Write header
    csv_writer.writerow(['id', 'file name', 'date'])
    # Write data
    csv_writer.writerows(data)

print(f"CSV file '{csv_file_path}' has been generated.")
