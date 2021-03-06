namespace AoC {
    export class AoC_2015_01 {
        getFinalFloor: (string) => number = (list: string): number => {
            let result: number = 0;
        
            for (let i: number = 0; i < list.length; i++) {
                switch (list[i]) {
                    case '(':
                        result++;
                        break;
                        
                    case ')':
                        result--;
                        break;
                }
            }
        
            return result;
        };

        getPositionForFloor: (string, number) => number = (list: string, target: number): number => {
            let result: number = 0;
            let currentFloor: number = 0;
        
            for (let i: number = 0; i < list.length; i++) {
                result++;
        
                switch (list[i]) {
                    case '(':
                        currentFloor++;
                        break;
                    case ')':
                        currentFloor--;
                        break;
                }
        
                if (currentFloor == target) {
                    break;
                }
            }
        
            return result;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/01/data.txt').toString();

let aoc_2015_01 = new AoC.AoC_2015_01();
console.log(aoc_2015_01.getFinalFloor(input));           // 232
console.log(aoc_2015_01.getPositionForFloor(input, -1)); // 1783