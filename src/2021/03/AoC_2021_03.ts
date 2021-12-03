namespace AoC._2021_03 {
    export class Main {

        constructor() {}

        parseInput = (input: string): string[] => {
            let result: string[] = input
                .split('\r\n')
                .filter((value: string) => value != null);

            return result;
        }

        getPowerConsumption = (list: string[]): number => {
            let gammaArray: number[] = Array(list[0].length).fill(0);
            let epsilonArray: number[] = Array(list[0].length).fill(0);

            // loop through each digit
            for (let j=0; j<list[0].length; j++) {
                let count0 = 0;
                let count1 = 0;

                // loop through the list
                for (let i=0; i<list.length; i++) {
                    switch(list[i][j]) {
                        case "0":
                            count0++;
                            break;

                        case "1":
                            count1++;
                            break;
                    }
                }

                // What happens when count0 == count1?
                gammaArray[j] = count0 > count1 ? 0 : 1;
                epsilonArray[j] = count0 < count1 ? 0 : 1;
            }

            return this.convertArrayToDecimal(gammaArray) * this.convertArrayToDecimal(epsilonArray);
        };

        private convertArrayToDecimal = (value: number[]): number => {
            let binaryString: string = value.reduce((acc, cur) => acc + cur.toString(), "");
            console.log(`binaryString: ${binaryString}`);
            return parseInt(binaryString, 2);
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/03/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_03: AoC._2021_03.Main = new AoC._2021_03.Main();
console.log(AoC_2021_03.getPowerConsumption(AoC_2021_03.parseInput(input))); // 841526
