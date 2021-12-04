namespace AoC._2021_04 {
    export class Main {
        sequence: number[];
        boards: BingoBoard[];

        constructor() {
            this.boards = [new BingoBoard()];
        }

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

            console.log(`board: \r\n${this.boards}`);
        }
    }

    class BingoBoard {
        readonly SIZE: number = 5;

        board: number[][];

        constructor() {
            this.board = Array(this.SIZE)
                            .fill(null)
                            .map(() => Array(this.SIZE).fill(0));
        }

        toString = (): string => {
            return this.board.reduce((acc: string, cur: number[]) => acc += `${cur}\r\n`, '');
        };

        parseRow = (rowNumber: number, input: string): void => {
            let row: number[] = input.split(' ')
                                     .filter(x => x.length > 0)
                                     .map(x => parseInt(x));
                                     
            this.board[rowNumber] = row;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/04/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_04: AoC._2021_04.Main = new AoC._2021_04.Main();

AoC_2021_04.parseInput(input);
console.log(AoC_2021_04.getFinalScore()); // 
