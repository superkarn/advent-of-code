namespace AoC._2021_06 {
    export class Main {
        // The rough size of each pool of Fish
        static readonly POOL_SIZE: number = 100000;

        poolsOfFish: Fish[][];

        constructor() {
            this.poolsOfFish = [];
        }

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

            this.poolsOfFish[0] = list;
        };

        simulateDays = (days: number): number => {
            let maxPoolSize = 0;
            for (let i=0; i<days; i++) {
                console.log(`  new day[${i}]. ${this.poolsOfFish.length} pools`);

                let offsprings: Fish[] = [];

                for (let f1=0; f1<this.poolsOfFish.length; f1++) {
                    //process.stdout.write(`.`);
                    //console.log(`  day[${i}], pool[${f1}]: ${this.poolsOfFish[f1]}`);

                    for (let f2=0; f2<this.poolsOfFish[f1].length; f2++) {
                        let hasNewOffspring: boolean = this.poolsOfFish[f1][f2].grow();

                        if (hasNewOffspring) {
                            offsprings.push(new Fish());
                        }
                    }
                }
                //console.log(`;`);

                // // If the pool is already larger than max, go to the next pool
                // if (this.poolsOfFish[currentPool].length > Main.POOL_SIZE) {
                //     currentPool++;
                //     console.log(`--adding a new pool: ${currentPool}`);

                //     this.poolsOfFish[currentPool] = [];
                // }

                // Add the offspring to the pool
                // 1- Using array1.merge(array2) is very slow, and the heap can run out of memory
                //this.poolsOfFish[currentPool] = this.poolsOfFish[currentPool].concat(offsprings);
                //
                // 2- Using array1.push(...array2) is fast, but can run out of stack size when array2 is too large
                //this.poolsOfFish[currentPool].push(...offsprings);
                //
                // 3- push() using batches doesn't help either
                // while (offsprings.length > 0) {
                //     //console.log(`      merging offspring size: ${offsprings.length}`);
                //     this.poolsOfFish[currentPool].push(...(offsprings.splice(0,10000)));
                // }
                //
                // 4- always add offsprings into a new pool by themselves
                if (offsprings.length > 0) {
                    console.log(`  day[${i}], ${offsprings.length} new offsprings`);
                    
                    while (offsprings.length > 0) {
                        maxPoolSize = Math.max(maxPoolSize, offsprings.length);

                        //console.log('Memory    : ', process.memoryUsage().heapUsed);
                        console.log(`  day[${i}], creating a new pool for total of ${this.poolsOfFish.length}    ${maxPoolSize}`);
                        this.poolsOfFish.push(offsprings.splice(0,Main.POOL_SIZE));
                    }
                }
            }

            // this.poolsOfFish.map((value, index) => {
            //     console.log(`-- pool[${index}] size: ${value.length}`);
            // });
            return this.poolsOfFish.reduce((acc, cur) => acc+=cur.length, 0);
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
//console.log(AoC_2021_06.simulateDays(80)); // 346063
console.log(AoC_2021_06.simulateDays(256)); // 