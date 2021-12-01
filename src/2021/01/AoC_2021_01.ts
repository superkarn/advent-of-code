namespace AoC._2021_01 {
    export class Main {
        constructor() {}

        parseInput = (input: string): number[] => {
            let result: number[] = input
                .split('\n')
                .filter((value: string) => value != null)
                .map((value: string) => parseInt(value));

            return result;
        }

        countIncrements = (list: number[]): number => {
            let result: number = 0;

            for (let i=1; i<list.length; i++) {
                if (list[i] > list[i-1]) {
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
console.log(AoC_2021_01.countIncrements(AoC_2021_01.parseInput(input))); // 
