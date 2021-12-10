namespace AoC._2021_10 {
    export class Main {
        static readonly CHAR_POINTS_ERROR = {
            ')': 3,
            ']': 57,
            '}': 1197,
            '>': 25137
        };

        static readonly CHAR_POINTS_AUTOCOMPLETE = {
            ')': 1,
            ']': 2,
            '}': 3,
            '>': 4
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
                    //console.log(`line ${i}: ${error} = ${Main.CHAR_POINTS_ERROR[error]}`);
                    result += Main.CHAR_POINTS_ERROR[error];
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
                        //console.log(`  ${i}: error character ${line[i]} worth ${Main.CHAR_POINTS_ERROR[line[i]]}`);
                        return line[i];
                    }
                }

                // should not get here
                throw new Error(`Error on line ${i}: invalid character.`);
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

        calculateMiddleScoreForAutocomplete = (list: string[][]): number => {
            let scores: number[] = [];

            // Get calculate missing chars for each line
            for (let i=0; i<list.length; i++) {
                let missingChars = this.getMissingChars(list[i]);
                //console.log(`line ${i} is missing ${missingChars}`);
                
                let sum: number = 0;
                for (let j=0; j<missingChars.length; j++) {
                    sum *= 5;
                    sum += Main.CHAR_POINTS_AUTOCOMPLETE[missingChars[j]];
                }

                scores.push(sum);
            }

            // sort the score and remove 0 (i.e. remove corrupted or completed lines, leaving only incomplete)
            scores.sort((a, b) => a-b);
            scores = scores.filter(x => x>0);

            // Returns the median
            return scores[Math.floor(scores.length/2)];
        };

        // This is similar to getFirstError
        private getMissingChars = (line: string[]): string[] => {
            let result: string[] = [];
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
                    //console.log(`  line[${i}]: ${line[i]} = ${Main.CHAR_CLOSE.indexOf(line[i])}`);

                    // and is a closing pair of the top of stack, 
                    // pop 1 from stack and go to the next char
                    if (stack.length > 0 && this.isMatching(stack[stack.length-1], line[i])) {
                        //console.log(`  ${i}-1: removing ${stack[stack.length-1]},${line[i]}`);
                        stack.pop();
                        continue;
                    }
                    // else no match, the line is corrupted
                    else {
                        return [];
                    }
                }
            }

            // at this point if stack is not empty, then the line is incomplete. 
            // Find the missing characters
            while (stack.length > 0) {
                result.push(this.getMatchingClose(stack.pop()));
            }

            return result;
        };

        private getMatchingClose = (open: string): string => {
            if (Main.CHAR_OPEN.indexOf(open) > -1) {
                return Main.CHAR_CLOSE[Main.CHAR_OPEN.indexOf(open)];
            } else {
                throw new Error(`Error: no closing character found for ${open}.`);
            }
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/10/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_10: AoC._2021_10.Main = new AoC._2021_10.Main();
console.log(AoC_2021_10.calculateSyntaxErrorScore(AoC_2021_10.parseInput(input))); // 364389
console.log(AoC_2021_10.calculateMiddleScoreForAutocomplete(AoC_2021_10.parseInput(input))); // 2870201088
