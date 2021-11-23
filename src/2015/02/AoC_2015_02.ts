namespace AoC {
    export class AoC_2015_02 {
        getWrappingArea = (list: number[][]): number  => {
            let result: number = 0;
            
            for (let i=0; i<list.length; i++) {
                let currentSet:number[] = list[i];
                //console.log(`${i}: ${currentSet}`);

                let side1: number = currentSet[0] * currentSet[1];
                let side2: number = currentSet[1] * currentSet[2];
                let side3: number = currentSet[2] * currentSet[0];
                let slack: number = Math.min(side1, side2, side3);

                //console.log(`  adding ${slack} + 2*(${side1} + ${side2} + ${side3})`);
                result += slack + 2 * (side1 + side2 + side3);
            }

            return result;
        };
        
        getRibbonLength = (list: number[][]): number  => {
            let result: number = 0;

            for (let i=0; i<list.length; i++) {
                let currentSet: number[] = list[i];
                //console.log(`  ${i}: ${currentSet}`);

                // sort the set, so the largest is last
                currentSet.sort((a,b) => a-b);                

                let ribbonLength: number = 2 * (currentSet[0] + currentSet[1]);                    
                let bowLength: number = currentSet[0] * currentSet[1] * currentSet[2];

                result += ribbonLength + bowLength;
                
                //console.log(`    adding ${ribbonLength} + ${bowLength} = ${ribbonLength + bowLength} => ${result}`);
            }

            return result;
        }
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/02/data.txt', {encoding:'utf8'}).toString();

// parse the input
let input_santized: number[][] = input
    .split('\n')
    .map(item => { 
        // if there's an empty line, skip it
        if (item.trim().length == 0) return null;

        // if there's an invalid line, throw an error
        // TODO: check that each line is in the format {w}x{h}x{l}

        // else parse the line
        return item.split('x').map(value => parseInt(value));
    })
    .filter(value => value != null);

let aoc_2015_02 = new AoC.AoC_2015_02();
console.log(aoc_2015_02.getWrappingArea(input_santized)); // 1598415
console.log(aoc_2015_02.getRibbonLength(input_santized)); // 3812909