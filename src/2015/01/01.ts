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

input = require('../../../2015/01/01.json');

let aoc_2015_01 = new AoC.AoC_2015_01();
console.log(aoc_2015_01.getFinalFloor(input.value));           // 232
console.log(aoc_2015_01.getPositionForFloor(input.value, -1)); // 1783