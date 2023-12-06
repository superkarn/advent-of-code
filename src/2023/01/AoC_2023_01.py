
DIGITS = {
    "0":"zero", 
    "1":"one", 
    "2":"two", 
    "3":"three", 
    "4":"four", 
    "5":"five", 
    "6":"six", 
    "7":"seven", 
    "8":"eight", 
    "9":"nine"
}

def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def get_digit_from_line(line, index, character):
    # Check for numeral numbers, returns matching numeral number
    if character in DIGITS:
        return character
    
    # Check for spelled out numbers, returns corresponding numeral number
    for number, string in DIGITS.items():
        if string == line[index: index+len(string)]:
            return str(number)

def get_first_number(line):
    for i, a in enumerate(line):
        result = get_digit_from_line(line, i, a)
        if result is not None:
            return result

def get_last_number(line):
    # line = the original line
    # i    = index of the original line
    # line_reversed = line in reversed order
    # i_reversed    = index of the reversed line

    line_reversed = ''.join(reversed(line))
    for i_reversed, a in enumerate(line_reversed):
        i = len(line) - i_reversed - 1;
        
        result = get_digit_from_line(line, i, a)
        if result is not None:
            return result


lines = get_lines_from_file_name("./data.txt")

result = 0
for line in lines:
    n1 = get_first_number(line)
    n2 = get_last_number(line)
    
    result += int(n1+n2)
    #print(f"  {result} <- {int(n1+n2)} <- {n1} + {n2} <- {line}")

print(f"{result}")

