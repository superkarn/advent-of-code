namespace AoC._2021_07 {
    export class Main {
        constructor() {}

        toString = (): string => {
            let result: string = '';
            return result;
        };

        parseInput = (input: string): number[] => {
            return input
                .split(',')
                .filter((value: string) => value != null && value.trim() != '')
                .map((value: string, index: number) => {
                    try {
                        return parseInt(value);
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })
        };

        calculateBestPosition = (list: number[]): number => {
            let result:  number = 0;

            // sort the list
            list.sort((a,b) => a-b);
            console.log(list);

            let median = this.findMedian(list);
            console.log(median);

            // get the distance of each position from the median
            for (let i=0; i<list.length; i++) {
                result += Math.abs(median - list[i]);
            }

            return result;
        };

        // https://stackoverflow.com/a/53660837
        private findMedian = (list: number[]): number => {
            const sorted = list.slice().sort((a, b) => a - b);
            const middle = Math.floor(sorted.length / 2);
        
            if (sorted.length % 2 === 0) {
                return (sorted[middle - 1] + sorted[middle]) / 2;
            }
        
            return sorted[middle];
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/07/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_07: AoC._2021_07.Main = new AoC._2021_07.Main();
console.log(AoC_2021_07.calculateBestPosition(AoC_2021_07.parseInput(input))); // 
