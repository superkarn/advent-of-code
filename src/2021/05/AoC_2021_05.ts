namespace AoC._2021_05 {
    export class Main {
        map: Map;

        constructor() {
            this.map = new Map();
        }

        toString = (): string => {
            let result: string = '';


            return result;
        };

        parseInput = (input: string): Position[][] => {
            return input
                .split('\r\n')
                .filter((value: string) => value != null && value.trim() != '')
                .map((value: string, index: number) => {
                    try {
                        let temp = value.split(' -> ');
                        let p1s = temp[0].split(',');
                        let p1 = new Position(parseInt(p1s[0]), parseInt(p1s[1]));
                        
                        let p2s = temp[1].split(',');
                        let p2 = new Position(parseInt(p2s[0]), parseInt(p2s[1]));

                        return [p1, p2];
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })
        };

        findDangerPoints = (list: Position[][], threshold: number): number => {
            for (let i=0; i<list.length; i++) {
                this.map.plotLine(list[i]);
            }

            //console.log(`${this.map.toString()}`);

            return this.map.countDangerousPositions(threshold);
        };
    }
    
    class Position {
        X: number = 0;
        Y: number = 0;

        constructor(x: number, y: number) {
            this.X = x;
            this.Y = y;
        }
    }

    class Map {
        readonly SIZE = 1000;
        grid: number[][];

        constructor () {
            this.grid = Array(this.SIZE)
                            .fill(null)
                            .map(() => Array(this.SIZE).fill(0));
        }

        toString = (): string => {
            let result = '';

            for (let i=0; i<this.SIZE; i++) {
                for (let j=0; j<this.SIZE; j++) {
                    // swap j,i so x,y will look right
                    if (this.grid[j][i] == 0) {
                        result += '.';
                    } else {
                        result += this.grid[j][i];
                    }
                }
                result += '\r\n';
            }

            return result;
        };

        plotLine = (line: Position[]): void => {
            // For now, only plot vertical or horizontal lines
            if (line[0].X != line[1].X &&
                line[0].Y != line[1].Y) {
                return;
            }

            // Vertical line
            if (line[0].X == line[1].X) {
                //console.log(`  vertical line from ${line[0].X},${line[0].Y} to ${line[1].X},${line[1].Y}`);
                
                // plot from smaller to larger
                let start = Math.min(line[0].Y, line[1].Y);
                let end = Math.max(line[0].Y, line[1].Y);
                for (let i=start; i<=end; i++) {
                    this.grid[line[0].X][i]++;
                }
            } 
            // Horizontal line
            // Using "else", so that we don't double map.
            else if (line[0].Y == line[1].Y) {
                //console.log(`  horizontal line from ${line[0].X},${line[0].Y} to ${line[1].X},${line[1].Y}`);
                
                // plot from smaller to larger
                let start = Math.min(line[0].X, line[1].X);
                let end = Math.max(line[0].X, line[1].X);
                for (let i=start; i<=end; i++) {
                    this.grid[i][line[0].Y]++;
                }
            }
        }

        countDangerousPositions = (threshold: number): number => {
            let result:  number = 0;

            for (let i=0; i<this.SIZE; i++) {
                for (let j=0; j<this.SIZE; j++) {
                    if (this.grid[i][j] >= threshold) {
                        result++;
                    }
                }
            }

            return result;
        }
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/05/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_05: AoC._2021_05.Main = new AoC._2021_05.Main();
console.log(AoC_2021_05.findDangerPoints(AoC_2021_05.parseInput(input), 2)); // 5197
