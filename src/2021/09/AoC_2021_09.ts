namespace AoC._2021_09 {
    export class Main {
        static readonly MAX_HEIGHT: number = 9;

        constructor() {}

        toString = (): string => {
            let result: string = '';
            return result;
        };

        parseInput = (input: string): number[][] => {
            return input
                .split('\r\n')
                .filter((value: string) => value != null && value.trim() != '')
                .map((value: string, index: number) => {
                    try {
                        return value.split('').map((v2) => parseInt(v2));
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })
        };
        
        calculateRiskLevel = (map: number[][]): number => {
            return this.findLocalMinima(map)
                       .reduce((acc: number, cur: number) => acc += cur + 1, 0);
        };

        calculateBasinValue = (map: number[][]): number => {
            let tempMap = map.map((x) => x.slice());
            this.mapMaxHeight(tempMap);
            this.countBasins(tempMap);
            console.log(`tempMap: ${tempMap}`);
            return 0;
        };

        // Return the list of local minima
        private findLocalMinima = (map: number[][]): number[] => {
            let result: number[] = [];

            for (let x=0; x<map.length; x++) {
                for (let y=0; y<map[x].length; y++) {
                    let currentHeight = map[x][y];
                    // North
                    if (x>0 && map[x-1][y] <= currentHeight) continue;

                    // South
                    if (x<map.length-1 && map[x+1][y] <= currentHeight) continue;

                    // East
                    if (y>0 && map[x][y-1] <= currentHeight) continue;

                    // West
                    if (y<map[x].length-1 && map[x][y+1] <= currentHeight) continue;

                    //console.log(`    [${x}][${y}] = ${map[x][y]} is a local minimum`);
                    result.push(map[x][y]);
                }
            };

            return result;
        };

        // Return the map with only max height (9), convert everything else to 0
        private mapMaxHeight = (map: number[][]): void => {
            map.map((x) => x.map((y) => y < 9 ? 0 : 9));
        };

        // Count the number of basins by marking each one with the corresponding basin number
        private countBasins = (map: number[][]): void => {
            let maxBasinNumber: number = 1;

            for (let x=0; x<map.length; x++) {
                console.log(`x:[${x}]: ${map[x]}`);

                for (let y=0; y<map[x].length; y++) {
                    let currentHeight = map[x][y];
                    console.log(`  [${x}][${y}] = ${map[x][y]}`);

                    // If the current height is max, it's not part of a basin
                    if (currentHeight == Main.MAX_HEIGHT) continue;

                    // North; TODO
                    if (x>0 && map[x-1][y] <= currentHeight) continue;

                    // South; TODO
                    if (x<map.length-1 && map[x+1][y] <= currentHeight) continue;

                    // East; TODO
                    if (y>0 && map[x][y-1] <= currentHeight) continue;

                    // West; TODO
                    if (y<map[x].length-1 && map[x][y+1] <= currentHeight) continue;

                }
            };
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/09/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_09: AoC._2021_09.Main = new AoC._2021_09.Main();
//console.log(AoC_2021_09.calculateRiskLevel(AoC_2021_09.parseInput(input))); // 585
console.log(AoC_2021_09.calculateBasinValue(AoC_2021_09.parseInput(input))); // 
