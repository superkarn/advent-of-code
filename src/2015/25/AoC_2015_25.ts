namespace AoC._2015_25 {
    export class Main {
        static INITIAL_NUMBER = 20151125;
        static MULTIPLYER = 252533;
        static DIVIDER = 33554393;

        constructor() {}

        parseInput = (input: string): string => {
            return input;
        }

        getCodeAt = (x: number, y: number): number => {
            return 0;
        }
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/25/data.txt', {encoding:'utf8'}).toString();

let AoC_2015_25: AoC._2015_25.Main = new AoC._2015_25.Main();
console.log(AoC_2015_25.getCodeAt(2981, 3075)); // 
