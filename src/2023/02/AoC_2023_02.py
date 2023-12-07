class CUBE_COLOR:
    RED   = 'red'
    GREEN = 'green'
    BLUE  = 'blue'

class Bag:
    def __init__(self, r, g, b):
        self.red   = r
        self.green = g
        self.blue  = b

class Game:
    def __init__(self, id):
        self.id = id
        self.sets = []

    def __str__(self):
        result = f"id:{self.id} -> "
        for set in self.sets:
            result += f"{set}"

        return result
    
    def is_valid(self):
        for set in self.sets:
            if set.red   > bag.red:   return False
            if set.green > bag.green: return False
            if set.blue  > bag.blue:  return False

        return True

class Set:
    def __init__(self, r, g, b):
        self.red   = r
        self.green = g
        self.blue  = b

    def __str__(self):
        return f"({self.red}, {self.green}, {self.blue})"


def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def load_data():
    lines = get_lines_from_file_name("./data.txt")
    result = []
    for line in lines:
        line_info = line.split(':')

        # Parse the game ID
        game = Game(int(line_info[0].split(' ')[1]))

        # Parse the sets
        for set in line_info[1].split(';'):
            red   = 0
            green = 0
            blue  = 0

            # Parse the cubes
            for cubes in set.strip().split(', '):
                cube_info = cubes.strip().split(' ')

                match cube_info[1]:
                    case CUBE_COLOR.RED:   red   = int(cube_info[0])
                    case CUBE_COLOR.GREEN: green = int(cube_info[0])
                    case CUBE_COLOR.BLUE:  blue  = int(cube_info[0])
            
            game.sets.append(Set(red, green, blue))

        result.append(game)
            
    return result

def get_sum_of_valid_game_ids():
    result = 0
    for game in data:
        if (game.is_valid()):
            result += game.id
    return result

##### Run the code

# Load the game data
data = load_data()

# Initial cubes in the bag
bag = Bag(12, 13, 14)

# Calcuate the data for part 1
result = get_sum_of_valid_game_ids()


print(f"{result}")

