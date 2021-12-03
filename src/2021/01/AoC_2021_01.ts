namespace AoC._2021_01 {
    export class Main {
        constructor() {}

        parseInput = (input: string): number[] => {
            let result: number[] = input
                .split('\r\n')
                .filter((value: string) => value != null)
                .map((value: string) => parseInt(value));

            return result;
        }

        countTerrainIncrements = (list: number[], range: number = 1): number => {
            let result: number = 0;

            for (let i=range; i<list.length; i++) {
                // Since the middle terrains are in both, they cancel out
                // and we only have to check first and last
                if (list[i] > list[i-range]) {
                    result++;
                }
            }

            return result;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/01/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_01: AoC._2021_01.Main = new AoC._2021_01.Main();
console.log(AoC_2021_01.countTerrainIncrements(AoC_2021_01.parseInput(input), 1)); // 1521
console.log(AoC_2021_01.countTerrainIncrements(AoC_2021_01.parseInput(input), 3)); // 1543
