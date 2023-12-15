import datetime

from enum import IntEnum

def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def load_data():
    lines = get_lines_from_file_name("./data.txt")
    result = AoC_05()

    # Parse the initial seeds
    result.seeds = list(map(lambda x: int(x),
                           lines[0].split(':')[1]
                                   .strip()
                                   .split(' ')
    ))

    # Parse the mapping
    current_map_type = MapType.SEED
    current_map = []
    for line in lines:
        # Skip the seed line
        if "seeds: " in line:
            continue

        # If blank line, skip to next line
        if line.isspace():
            continue

        # If new map line, reset the map for the new one
        if " map:" in line:
            result.maps.append(current_map)
            current_map_type = MapType(int(current_map_type)+1)
            current_map = []
            continue

        # Parse the ranges
        line_info = line.split(':')
        map_line = Map(*list(map(lambda x: int(x),
                            line.split(' ')
        )))
        current_map.append(map_line)

    # Append the last map
    result.maps.append(current_map)

    return result

class AoC_05:
    def __init__(self) -> None:
        self.seeds = []
        self.maps = []

    def __str__(self) -> str:
        return f"\n  seeds: {self.seeds}\n  maps: {self.maps}"
    
class MapType(IntEnum):
    SEED = 0
    SOIL = 1
    FERTILIZER = 2
    WATER = 3
    LIGHT = 4
    TEMPERATURE = 5
    HUMIDITY = 6
    LOCATION = 7

# TODO Expand this to cover multiple maps
class Map:
    
    def __init__(self, dest, src, len) -> None:
        self.source_start = src
        self.destination_start = dest
        self.range_length = len

    def __str__(self) -> str:
        return f"[{self.destination_start}, {self.source_start}, {self.range_length}]"
    
    def __repr__(self) -> str:
        return self.__str__()
    
    def get_destination(self, src) -> str:
        # Default destination is the same as source
        result = src

        # Check to see if there's a map
        if self.source_start <= src and src < self.source_start+self.range_length:
            result = self.destination_start + (src - self.source_start)

        print(f"  mapped {src} -> {result}")
        return result
##### Run the code

# Load the game data
start_time = datetime.datetime.now()
data = load_data()
end_time = datetime.datetime.now()
print(f"Loading data took {(end_time-start_time).microseconds} microseconds")

print(f"data: {data}")

# Calculate the data for part 1
start_time = datetime.datetime.now()
result1 = 0
end_time = datetime.datetime.now()
print(f"Part 1: {result1} ({(end_time-start_time).microseconds} microseconds)")