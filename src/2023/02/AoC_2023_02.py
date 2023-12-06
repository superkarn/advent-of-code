#
def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()




lines = get_lines_from_file_name("./data.txt")

result = 0

print(f"{result}")

