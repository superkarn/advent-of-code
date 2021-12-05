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
        grid: number[][];

        constructor (dimension: number = 1000) {
            this.grid = Array(dimension)
                            .fill(null)
                            .map(() => Array(dimension).fill(0));
        }

        toString = (): string => {
            let result = '';

            for (let i=0; i<this.grid.length; i++) {
                for (let j=0; j<this.grid.length; j++) {
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
            let start: Position = line[0];
            let end: Position = line[1];

            // Vertical line
            if (start.X == end.X) {
                //console.log(`    vertical line from ${start.X},${start.Y} to ${end.X},${end.Y}`);
                
                // plot from smaller to larger
                let startY = Math.min(start.Y, end.Y);
                let endY = Math.max(start.Y, end.Y);
                for (let i=startY; i<=endY; i++) {
                    this.grid[start.X][i]++;
                }
            } 
            // Horizontal line
            // Using "else", so that we don't double map.
            else if (start.Y == end.Y) {
                //console.log(`  horizontal line from ${start.X},${start.Y} to ${end.X},${end.Y}`);
                
                // plot from smaller to larger
                let startX = Math.min(start.X, end.X);
                let endX = Math.max(start.X, end.X);
                for (let i=startX; i<=endX; i++) {
                    this.grid[i][start.Y]++;
                }
            }
            // Diagonal line
            else if (Math.abs(end.X-start.X) == Math.abs(end.Y-start.Y)) {
                //console.log(`   diangonal line from ${start.X},${start.Y} to ${end.X},${end.Y}`);

                let steps: number = Math.abs(start.X - end.X);
                let x: number = start.X;
                let y: number = start.Y;

                let deltaX = start.X == end.X ? 0 : start.X < end.X ? 1 : -1;
                let deltaY = start.Y == end.Y ? 0 : start.Y < end.Y ? 1 : -1;
    
                for (let i=0; i<=steps; i++) {
                    this.grid[x][y]++;
                    
                    x += deltaX;
                    y += deltaY;
                }
            } else {
                console.log(`         bad line from ${start.X},${start.Y} to ${end.X},${end.Y}`);
            }
        };

        countDangerousPositions = (threshold: number): number => {
            let result:  number = 0;

            for (let i=0; i<this.grid.length; i++) {
                for (let j=0; j<this.grid.length; j++) {
                    if (this.grid[i][j] >= threshold) {
                        result++;
                    }
                }
            }

            return result;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/05/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_05: AoC._2021_05.Main = new AoC._2021_05.Main();
console.log(AoC_2021_05.findDangerPoints(AoC_2021_05.parseInput(input), 2)); // 5197, 18605
