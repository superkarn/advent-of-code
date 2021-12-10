namespace AoC._2021_10 {
    export class Main {
        static readonly CHAR_POINTS = {
            ')': 3,
            ']': 57,
            '}': 1197,
            '>': 25137
        };

        static readonly CHAR_OPEN = ['(', '[', '{', '<'];
        static readonly CHAR_CLOSE = [')', ']', '}', '>'];

        constructor() {}

        toString = (): string => {
            let result: string = '';
            return result;
        };

        parseInput = (input: string): string[][] => {
            return input
                .split('\r\n')
                .filter((value: string) => value != null && value.trim() != '')
                .map((value: string) => {
                    try {
                        return value.split('');
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })
        };

        calculateSyntaxErrorScore = (list: string[][]): number => {
            let result: number = 0;
            
            for (let i=0; i<list.length; i++) {
                //console.log(`line ${i} -----`);
                let error = this.getFirstError(list[i]);
                
                if (Main.CHAR_CLOSE.indexOf(error) > -1) {
                    //console.log(`line ${i}: ${error} = ${Main.CHAR_POINTS[error]}`);
                    result += Main.CHAR_POINTS[error];
                }
            }
            
            return result;
        };

        private getFirstError = (line: string[]): string => {
            let stack: string[] = [];

            for (let i=0; i<line.length; i++) {
                // If the current char is OPEN
                if (Main.CHAR_OPEN.indexOf(line[i]) > -1) {
                    //console.log(`  ${i}: adding ${line[i]}`);
                    stack.push(line[i]);
                    continue;
                } 

                // If the current char is CLOSE
                if (Main.CHAR_CLOSE.indexOf(line[i]) > -1) {
                    // and is a closing pair of the top of stack, 
                    // pop 1 from stack and go to the next char
                    if (stack.length > 0 && this.isMatching(stack[stack.length-1], line[i])) {
                        //console.log(`  ${i}-1: removing ${stack[stack.length-1]},${line[i]}`);
                        stack.pop();
                        continue;
                    }
                    // else no match, it's an error
                    else {
                        //console.log(`  ${i}: error character ${line[i]} worth ${Main.CHAR_POINTS[line[i]]}`);
                        return line[i];
                    }
                }

                // should not get here
                throw new Error(`Error on line ${i}.`);
            }

            //console.log(`  end of line, no error found`);
            return '';
        };

        // Returns true if open and close are matching pair
        private isMatching = (open: string, close: string): boolean => {
            return (open == '(' && close == ')') ||
                   (open == '[' && close == ']') ||
                   (open == '{' && close == '}') ||
                   (open == '<' && close == '>');
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/10/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_10: AoC._2021_10.Main = new AoC._2021_10.Main();
console.log(AoC_2021_10.calculateSyntaxErrorScore(AoC_2021_10.parseInput(input))); // 364389
