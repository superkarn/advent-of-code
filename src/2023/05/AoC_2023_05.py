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
    current_map = Map()
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
            current_map = Map()
            continue

        # Parse the ranges
        line_info = line.split(':')
        map_line = Range(*list(map(lambda x: int(x),
                            line.split(' ')
        )))
        current_map.ranges.append(map_line)

    # Append the last map
    result.maps.append(current_map)

    # Get rid of the first, empty map
    result.maps.pop(0)


    return result

class AoC_05:
    def __init__(self) -> None:
        self.seeds = []
        self.maps = []

    def __str__(self) -> str:
        return f"\n  seeds: {self.seeds}\n  maps: {self.maps}"
    
    def get_lowest_location(self) -> int:
        locations = []
        for i, seed in enumerate(self.seeds):
            location = self.maps[MapType.HUMIDITY].get_destination(
                self.maps[MapType.TEMPERATURE].get_destination(
                self.maps[MapType.LIGHT].get_destination(
                self.maps[MapType.WATER].get_destination(
                self.maps[MapType.FERTILIZER].get_destination(
                self.maps[MapType.SOIL].get_destination(
                self.maps[MapType.SEED].get_destination(seed)
            ))))))
            
            #print(f"seed[{i}]: {data.seeds[i]} -> {location}")
            locations.append(location)
        
        return min(locations)

class MapType(IntEnum):
    SEED = 0
    SOIL = 1
    FERTILIZER = 2
    WATER = 3
    LIGHT = 4
    TEMPERATURE = 5
    HUMIDITY = 6
    LOCATION = 7 # This map doesn't exist, but as the last location

class Range:
    
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

        #print(f"  mapped {src} -> {result}")
        return result
    
class Map:
    ranges = []

    def __init__(self) -> None:
        self.ranges = []
    
    def __str__(self) -> str:
        return f"Map.ranges: {self.ranges}\n"
    
    def __repr__(self) -> str:
        return self.__str__()
    
    def get_destination(self, src) -> int:
        result = src
        for range in self.ranges:
            x = range.get_destination(src)
            if x != src:
                result = x
                break

        return result

##### Run the code

# Load the game data
start_time = datetime.datetime.now()
data = load_data()
end_time = datetime.datetime.now()
print(f"Loading data took {(end_time-start_time).microseconds} microseconds")

# Calculate the data for part 1
start_time = datetime.datetime.now()
result1 = data.get_lowest_location()
end_time = datetime.datetime.now()
print(f"Part 1: {result1} (Took {(end_time-start_time).microseconds} microseconds)")