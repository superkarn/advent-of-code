namespace AoC._2021_09 {
    export class Main {
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

        private findLocalMinima = (map: number[][]): number[] => {
            let result: number[] = [];

            for (let x=0; x<map.length; x++) {
                //console.log(`x:[${x}]: ${map[x]}`);

                for (let y=0; y<map[x].length; y++) {
                    let currentHeight = map[x][y];
                    //console.log(`  [${x}][${y}] = ${map[x][y]}`);

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
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/09/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_09: AoC._2021_09.Main = new AoC._2021_09.Main();
console.log(AoC_2021_09.calculateRiskLevel(AoC_2021_09.parseInput(input))); // 585
