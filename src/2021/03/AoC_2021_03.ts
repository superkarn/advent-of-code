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

        getLifeSupportRating = (list: string[]): number => {
            return this.getOxygenGeneratorRating(list) * this.getCO2GeneratorRating(list);
        };

        private getOxygenGeneratorRating = (list: string[]): number => {
            let filteredList: string[] = list;
            let j: number = 0;

            // loop through each digit
            while (filteredList.length > 1 && j < filteredList[0].length) {
                let count0 = 0;
                let count1 = 0;

                // loop through the list
                for (let i=0; i<filteredList.length; i++) {
                    switch(filteredList[i][j]) {
                        case "0":
                            count0++;
                            break;

                        case "1":
                            count1++;
                            break;
                    }
                }

                // Keep the higher count.  If equal, keep 1.
                filteredList = filteredList.filter((x:string) => x[j] == (count1 >= count0 ? "1" : "0"));

                j++;
            }

            // There should only be one number left
            if (filteredList.length > 1) {
                throw new RangeError(`Too many numbers left: ${filteredList.length}`);
            }

            return parseInt(filteredList[0], 2);
        };

        
        private getCO2GeneratorRating = (list: string[]): number => {
            let filteredList: string[] = list;
            let j: number = 0;

            // loop through each digit
            while (filteredList.length > 1 && j < filteredList[0].length) {
                let count0 = 0;
                let count1 = 0;

                // loop through the list
                for (let i=0; i<filteredList.length; i++) {
                    switch(filteredList[i][j]) {
                        case "0":
                            count0++;
                            break;

                        case "1":
                            count1++;
                            break;
                    }
                }

                // Keep the lower count.  If equal, keep 0.
                filteredList = filteredList.filter((x:string) => x[j] == (count1 < count0 ? "1" : "0"));

                j++;
            }

            // There should only be one number left
            if (filteredList.length > 1) {
                throw new RangeError(`Too many numbers left: ${filteredList.length}`);
            }

            return parseInt(filteredList[0], 2);
        };

        private convertArrayToDecimal = (value: number[]): number => {
            if (!value || value.length == 0) {
                return 0;
            }

            let binaryString: string = value.reduce((acc, cur) => acc + cur.toString(), "");
            return parseInt(binaryString, 2);
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/03/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_03: AoC._2021_03.Main = new AoC._2021_03.Main();
console.log(AoC_2021_03.getPowerConsumption(AoC_2021_03.parseInput(input))); // 841526
console.log(AoC_2021_03.getLifeSupportRating(AoC_2021_03.parseInput(input))); // 4790390
