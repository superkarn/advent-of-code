namespace AoC._2021_08 {
    export class Main {
        static readonly NUMBERS = [
            6, // 0
            2, // 1
            5, // 2
            5, // 3
            4, // 4
            5, // 5
            6, // 6
            3, // 7
            7, // 8
            6, // 9
        ];

        constructor() {}

        toString = (): string => {
            let result: string = '';
            return result;
        };

        // output
        // i = each line
        // j = 0 left side; 1 right side
        // k = each number
        parseInput = (input: string): string[][][] => {
            return input
                .split('\r\n')
                .filter((value: string) => value != null && value.trim() != '')
                .map((value: string, index: number) => {
                    try {
                        let t = value.split(' | ');
                        return [
                            t[0].split(' '),
                            t[1].split(' ')
                        ];
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })
        };

        getTotalCountOf = (searchValues: number[], list: string[][][]): number => {
            return this.getCountOf(searchValues, list).reduce((acc, cur) => acc += cur, 0);
        }

        private getCountOf = (searchValues: number[], list: string[][][]): number[] => {
            let result: number[] = Array(searchValues.length).fill(0);

            for (let i=0; i<list.length; i++) {
                let j = 1;
                let secondSet = list[i][j];
                for (let k=0; k<secondSet.length; k++) {
                    for (let s=0; s<searchValues.length; s++) {
                        if (Main.NUMBERS.indexOf(secondSet[k].length) == searchValues[s]) {
                            result[s]++;
                        }
                    }
                }
            }

            return result;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/08/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_08: AoC._2021_08.Main = new AoC._2021_08.Main();
console.log(AoC_2021_08.getTotalCountOf([1, 4, 7, 8], AoC_2021_08.parseInput(input))); // 
