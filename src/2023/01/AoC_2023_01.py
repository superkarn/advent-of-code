
def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def get_first_number(line):
    for i, a in enumerate(line):
        match a:
            case "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9":
                return a
            case "z":
                if "zero" == line[i: i+len("zero")]:
                    return "0"
            case "o":
                if "one" == line[i: i+len("one")]:
                    return "1"
            case "t":
                if "two" == line[i: i+len("two")]:
                    return "2"
                if "three" == line[i: i+len("three")]:
                    return "3"
            case "f":
                if "four" == line[i: i+len("four")]:
                    return "4"
                if "five" == line[i: i+len("five")]:
                    return "5"
            case "s":
                if "six" == line[i: i+len("six")]:
                    return "6"
                if "seven" == line[i: i+len("seven")]:
                    return "7"
            case "e":
                if "eight" == line[i: i+len("eight")]:
                    return "8"
            case "n":
                if "nine" == line[i: i+len("nine")]:
                    return "9"

def get_last_number(line):
    # line = the original line
    # i    = index of the original line
    # line_reversed = line in reversed order
    # i_reversed    = index of the reversed line

    line_reversed = ''.join(reversed(line))
    for i_reversed, a in enumerate(line_reversed):
        i = len(line) - i_reversed - 1;
        match a:
            case "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9":
                return a
            case "z":
                if "zero" == line[i: i+len("zero")]:
                    return "0"
            case "o":
                if "one" == line[i: i+len("one")]:
                    return "1"
            case "t":
                if "two" == line[i: i+len("two")]:
                    return "2"
                if "three" == line[i: i+len("three")]:
                    return "3"
            case "f":
                if "four" == line[i: i+len("four")]:
                    return "4"
                if "five" == line[i: i+len("five")]:
                    return "5"
            case "s":
                if "six" == line[i: i+len("six")]:
                    return "6"
                if "seven" == line[i: i+len("seven")]:
                    return "7"
            case "e":
                if "eight" == line[i: i+len("eight")]:
                    return "8"
            case "n":
                if "nine" == line[i: i+len("nine")]:
                    return "9"


lines = get_lines_from_file_name("./data.txt")

result = 0
for line in lines:
    n1 = get_first_number(line)
    n2 = get_last_number(line)
    
    result += int(n1+n2)


print(f"{result}")

