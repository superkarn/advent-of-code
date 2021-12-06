namespace AoC._2021_06 {
    export class Main {
        poolOfFish: Fish[];

        constructor() {}

        toString = (): string => {
            let result: string = '';


            return result;
        };

        parseInput = (input: string): void => {
            let list = input
                .split(',')
                .map((value: string) => {
                    try {
                        return new Fish(parseInt(value));
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })

            this.poolOfFish = list;
        };

        simulateDays = (days: number): number => {
            for (let i=0; i<days; i++) {
                //console.log(`  day ${i}: ${this.poolOfFish.length} => ${this.poolOfFish}`);

                let offsprings: Fish[] = new Array();

                for (let f=0; f<this.poolOfFish.length; f++) {
                    let hasNewOffspring: boolean = this.poolOfFish[f].grow();

                    if (hasNewOffspring) {
                        offsprings.push(new Fish());
                    }
                }

                this.poolOfFish.push(...offsprings);
            }

            return this.poolOfFish.length;
        };
    }

    class Fish {
        static readonly DEFAULT_AGE: number = 6; // 7 days in a 0th based counting system
        static readonly MATURITY_OFFSET: number = 2;

        age: number;

        constructor(age: number = (Fish.DEFAULT_AGE+Fish.MATURITY_OFFSET)) {
            this.age = age;
        }

        toString = (): string => {
            return this.age.toString();
        };

        // Returns true, if it produces an offspring
        grow = (): boolean => {
            if (this.age == 0) {
                this.age = Fish.DEFAULT_AGE;
                return true
            } else {
                this.age--;
                return false;
            }
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/06/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_06: AoC._2021_06.Main = new AoC._2021_06.Main();
AoC_2021_06.parseInput(input);
console.log(AoC_2021_06.simulateDays(80)); // 346063
