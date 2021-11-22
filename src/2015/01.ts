let getFinalFloor: (string) => number = (list: string): number => {
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


let getPositionForFloor: (string, number) => number = (list: string, target: number): number => {
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

let input = require('../2015/01.json');

console.log(getFinalFloor(input.value));           // 232
console.log(getPositionForFloor(input.value, -1)); // 1783