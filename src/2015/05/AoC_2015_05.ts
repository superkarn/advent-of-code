namespace AoC {
    export class AoC_2015_05 {
        CryptoJS = require('crypto-js');

        static readonly VOWELS: string[] = ['a', 'e', 'i', 'o', 'u'];
        static readonly BLACK_LIST: string[] = ['ab', 'cd', 'pq', 'xy'];

        getNiceStringCount = (list: string[]): number  => {
            let result: number = 0;

            for (let i=0; i<list.length; i++) {
                //console.log(`  ${i}, ${list[i]}`);

                if (this.containsXOrMoreVowels(list[i], 3) === false) {
                    //console.log(`    skip due to < 3 vowels`);
                    continue;
                }
                
                if (this.containsDoubleLetters(list[i]) === false) {
                    //console.log(`    skip due to no double letters`);
                    continue;
                }

                if (this.containsBlackListedString(list[i]) === true) {
                    //console.log(`    skip due to black list`);
                    continue;
                }

                result++;
            }

            return result;
        };

        containsXOrMoreVowels(str: string, minVowel: number=3): boolean {
            let vowelCount: number = 0;

            for (let j=0; j<str.length; j++) {
                if (AoC_2015_05.VOWELS.indexOf(str[j]) > -1) {
                    vowelCount++;
                }
            }

            return vowelCount >= minVowel;
        }

        
        containsDoubleLetters(str: string): boolean {
            let result: boolean = false;

            for (let j=1; j<str.length; j++) {
                if (str[j-1] === str[j]) {
                    result = true;
                    break;
                }
            }

            return result;
        }

        containsBlackListedString(str: string): boolean {
            let result: boolean = false;

            for (let j=0; j<AoC_2015_05.BLACK_LIST.length; j++) {
                if (str.indexOf(AoC_2015_05.BLACK_LIST[j]) > -1) {
                    result = true;
                    break;
                }
            }

            return result;
        }

        parseInput = (input: string): string[] => {
            let result: string[] = input
                .split('\n')
                .filter((value: string) => value != null)
                .map((value: string) => value.trimEnd());

            return result;
        }
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/05/data.txt', {encoding:'utf8'}).toString();

let AoC_2015_05: AoC.AoC_2015_05 = new AoC.AoC_2015_05();
console.log(AoC_2015_05.getNiceStringCount(AoC_2015_05.parseInput(input))); // 
