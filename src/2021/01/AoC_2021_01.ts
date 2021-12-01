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

        countSumIncrements = (list: number[]): number => {
            let result: number = 0;

            for (let i=3; i<list.length; i++) {
                // // We want to compare the currentSum to previousSum
                // let previousSum = list[i-3] + list[i-2] + list[i-1];
                // let currentSum = list[i-2] + list[i-1] + list[i];
                // if (currentSum > previousSum) {
                //     result++;
                // }

                // Since list[i-2] and list[i-1] are in both, they cancel out
                // and we only have to check list[i] and list[i-3]
                if (list[i] > list[i-3]) {
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
console.log(AoC_2021_01.countIncrements(AoC_2021_01.parseInput(input))); // 1521
console.log(AoC_2021_01.countSumIncrements(AoC_2021_01.parseInput(input))); // 1543
