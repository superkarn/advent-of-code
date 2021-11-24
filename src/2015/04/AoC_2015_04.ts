namespace AoC {
    export class AoC_2015_04 {
        CryptoJS = require('crypto-js');

        mine = (key: string): number  => {
            let i: number = 0;

            while (true) {
                let hash = this.CryptoJS.MD5(`${key}${i}`).toString();
                //console.log(`${i}: ${hash}`);

                // found a hash that starts with 00000
                if (hash.substring(0,5) === "00000") {
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
console.log(AoC_2015_04.mine(input)); // 
