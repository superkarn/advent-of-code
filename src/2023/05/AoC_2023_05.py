import datetime

def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def load_data():
    lines = get_lines_from_file_name("./data.txt")
    result = lines

    return result

##### Run the code

# Load the game data
start_time = datetime.datetime.now()
data = load_data()
end_time = datetime.datetime.now()
print(f"Loading data took {(end_time-start_time).microseconds} microseconds")


# Calculate the data for part 1
start_time = datetime.datetime.now()
result1 = 0
end_time = datetime.datetime.now()
print(f"Part 1: {result1} ({(end_time-start_time).microseconds} microseconds)")