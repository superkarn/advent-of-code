namespace AoC {
    export class AoC_2015_04 {
        CryptoJS = require('crypto-js');

        mine = (key: string, zeros: number): number  => {
            let i: number = 0;
            let startingZeros = ''.padStart(zeros,'0');

            while (true) {
                let hash = this.CryptoJS.MD5(`${key}${i}`).toString();
                //console.log(`${i}: ${hash}`);

                // found the first solution
                if (hash.substring(0,zeros) === startingZeros) {
                    break;
                }

                i++;
            }

            return i;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/04/data.txt', {encoding:'utf8'}).toString();

let AoC_2015_04: AoC.AoC_2015_04 = new AoC.AoC_2015_04();
console.log(AoC_2015_04.mine(input, 5)); // 254575
console.log(AoC_2015_04.mine(input, 6)); // 1038736
