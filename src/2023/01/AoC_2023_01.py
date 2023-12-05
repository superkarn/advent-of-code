
def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def get_first_number(line):
    for a in line:
        match a:
            case "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9":
                return a

def get_last_number(line):
    for a in reversed(line):
        match a:
            case "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9":
                return a


lines = get_lines_from_file_name("./data.txt")

result = 0
for line in lines:
    n1 = get_first_number(line)
    n2 = get_last_number(line)
    
    result += int(n1+n2)


print(f"{result}")

