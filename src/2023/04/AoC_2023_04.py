def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def load_data():
    lines = get_lines_from_file_name("./data.txt")
    result = []
    for line in lines:
        line_info = line.split(':')



##### Run the code

# Load the game data
data = load_data()


