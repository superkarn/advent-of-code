namespace AoC._2021_04 {
    export class Main {
        sequence: number[];
        boards: BingoBoard[];

        constructor() {
            this.boards = [new BingoBoard()];
        }

        toString = (): string => {
            let result: string = '';

            for (let i=0; i<this.boards.length; i++) {
                result += this.boards[i].toString() + '\r\n\r\n';
            }

            return result;
        };

        // TODO update parseInput to actually return something
        parseInput = (input: string): void => {
            let lines: string[] = input
                .split('\r\n')
                .filter((value: string) => value != null);

            this.sequence = lines[0].split(',').map(x => parseInt(x));

            let boardIndex = 0;
            for (let i=2; i<lines.length; i+=6) {
                let b: BingoBoard = new BingoBoard();

                //console.log(`  ${i}: ${lines[i]}`);
                b.parseRow(0, lines[i]);
                b.parseRow(1, lines[i+1]);
                b.parseRow(2, lines[i+2]);
                b.parseRow(3, lines[i+3]);
                b.parseRow(4, lines[i+4]);
                this.boards[boardIndex] = b;

                boardIndex++;
            }
        };

        getFirstWinningBoardScore = (): number => {
            for (let i=0; i<this.sequence.length; i++) {
                for (let j=0; j<this.boards.length; j++) {
                    this.boards[j].markNumber(this.sequence[i]);

                    if (this.boards[j].checkIfWon()) {
                        console.log(`first winning board[${j}]: \r\n${this.boards[j]}`);
                        
                        return this.boards[j].calculateFinalScore(this.sequence[i]);
                    }
                }
            }

            return 0;
        };

        getLastWinningBoardScore = (): number => {
            let numberOfWinningBoards: number = 0;
            for (let i=0; i<this.sequence.length; i++) {
                for (let j=0; j<this.boards.length; j++) {
                    // This this board has already won, skip
                    if (this.boards[j].hasWon) {
                        continue;
                    }

                    this.boards[j].markNumber(this.sequence[i]);

                    if (this.boards[j].checkIfWon()) {
                        numberOfWinningBoards++;

                        if (numberOfWinningBoards == this.boards.length) {
                            console.log(`last winning board[${j}]: \r\n${this.boards[j]}`);
                            
                            return this.boards[j].calculateFinalScore(this.sequence[i]);
                        }
                    }
                }
            }

            return 0;
        };
    }

    enum CelStatus {
        Default = 0,
        Called = 1
    }

    class BingoBoard {
        readonly SIZE: number = 5;

        // Contains the numbers on the board
        numbers: number[][];

        // Contains the status of each number
        statuses: CelStatus[][];

        // True if the board has winning numbers
        hasWon: boolean;

        constructor() {
            this.numbers = Array(this.SIZE)
                            .fill(null)
                            .map(() => Array(this.SIZE).fill(0));

            this.statuses = Array(this.SIZE)
                            .fill(null)
                            .map(() => Array(this.SIZE).fill(CelStatus.Default));
        }

        toString = (): string => {
            let result = '';
            for (let i=0; i<this.SIZE; i++) {
                for (let j=0; j<this.SIZE; j++) {
                    result += `${this.numbers[i][j].toString().padStart(2, ' ')}, `;
                }
                result += ' | ';

                for (let j=0; j<this.SIZE; j++) {
                    result += `${this.statuses[i][j].toString().padStart(2, ' ')}, `;
                }
                result += '\r\n';
            }
            return result;
        };

        parseRow = (rowNumber: number, input: string): void => {
            let row: number[] = input.split(' ')
                                     .filter(x => x.length > 0)
                                     .map(x => parseInt(x));
                                     
            this.numbers[rowNumber] = row;
        };

        // Mark the number.  Assume each cell has unique value.
        markNumber = (value: number): void => {
            for (let i=0; i<this.SIZE; i++) {
                for (let j=0; j<this.SIZE; j++) {
                    if (this.numbers[i][j] == value) {
                        this.statuses[i][j] = CelStatus.Called;
                        return;
                    }
                }
            }
        };

        // Check if the board has won.
        // Winning means all numbers in a row are marked.
        // Or all numbers in a column are marked.
        checkIfWon = (): boolean => {
            // Check rows
            for (let i=0; i<this.SIZE; i++) {
                let winningSet: boolean = true;
                for (let j=0; j<this.SIZE; j++) {
                    if (this.statuses[i][j] == CelStatus.Default) {
                        winningSet = false;
                    }
                }

                if (winningSet) {
                    this.hasWon = true;
                    return this.hasWon;
                }
            }

            // Check columns
            for (let j=0; j<this.SIZE; j++) {
                let winningSet: boolean = true;
                for (let i=0; i<this.SIZE; i++) {
                    if (this.statuses[i][j] == CelStatus.Default) {
                        winningSet = false;
                    }
                }

                if (winningSet) {
                    this.hasWon = true;
                    return this.hasWon;
                }
            }

            this.hasWon = false;
            return this.hasWon;
        };

        calculateFinalScore = (value: number): number => {
            let result: number = 0;

            // Get sum of unmarked numbers
            for (let i=0; i<this.SIZE; i++) {
                for (let j=0; j<this.SIZE; j++) {
                    if (this.statuses[i][j] == CelStatus.Default) {
                        result += this.numbers[i][j];
                    }
                }
            }

            // multiply it by the latest sequence
            result *= value;

            return result;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/04/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_04: AoC._2021_04.Main = new AoC._2021_04.Main();

AoC_2021_04.parseInput(input);
console.log(AoC_2021_04.getFirstWinningBoardScore()); // 82440
console.log(AoC_2021_04.getLastWinningBoardScore()); // 20774
