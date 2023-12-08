def get_lines_from_file_name(file_name):
    data = open(file_name, 'r')
    return data.readlines()

def load_data():
    lines = get_lines_from_file_name("./data.txt")
    result = []
    for line in lines:
        line_info = line.split(':')

        # Parse the card ID
        id_in_string = line_info[0].split(' ')
        id_in_string = [x for x in id_in_string if x != ''] # Remove empty element due to leading black spaces
        card = Card(int(id_in_string[1]))
        
        nums = line_info[1].split('|')

        # Parse the winning numbers (left)
        nums_in_string = nums[0].strip().split(' ')
        nums_in_string = [x for x in nums_in_string if x != ''] # Remove empty element due to leading black spaces
        card.winning_numbers = set(map(lambda x: int(x), nums_in_string))

        # Parse the playing numbers (right)
        nums_in_string = nums[1].strip().split(' ')
        nums_in_string = [x for x in nums_in_string if x != ''] # Remove empty element due to leading black spaces
        card.playing_numbers = set(map(lambda x: int(x), nums_in_string))

        result.append(card)

    return result

class Card:
    def __init__(self, id):
        self.id = id
        self.count = 1
        self.winning_numbers = {}
        self.playing_numbers = {}

    def __str__(self):
        result = f"id:{self.id}x{self.count} -> {self.winning_numbers} | {self.playing_numbers}"
        return result

    def get_matching_numbers(self):
        return self.winning_numbers.intersection(self.playing_numbers)

    def calculate_points(self):
        matching_numbers = self.get_matching_numbers()
        matching_numbers_count = len(matching_numbers)

        if matching_numbers_count > 0:
            return pow(2, matching_numbers_count-1)
        else:
            return 0

def calculate_winning_cards(cards):
    for i, card in enumerate(cards):
        matching_numbers = card.get_matching_numbers()

        matching_number_count = len(matching_numbers) if len(matching_numbers) > 0 else 0
        
        # Increment the count of the bonus cards by card.count times
        for j in range(card.count):
            for k in range(matching_number_count):
                cards[1+i+k].count += 1

    return cards
##### Run the code

# Load the game data
data = load_data()


# Calculate the data for part 1
result1 = 0
for c in data:
    result1 += c.calculate_points()

print(f"Part 1: {result1}")


# Calculate the data for part 2
cards = calculate_winning_cards(data)
result2 = 0
for card in cards:
    result2 += card.count
print(f"Part 2: {result2}")