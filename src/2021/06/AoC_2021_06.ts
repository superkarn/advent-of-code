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
                .sort((a: string, b: string) => parseInt(a) - parseInt(b))
                .map((value: string) => {
                    try {
                        return new Fish(value);
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })

            this.poolsOfFish[0] = list;
        };

        simulateDays = (days: number): number => {
            let cutoff = 200;

            let maxPoolSize = 0;
            let offsprings: Fish[] = [];

            for (let i=0; i<days; i++) {
                console.log(`  new day[${i}]. ${this.poolsOfFish.length} pools`);

                for (let f1=0; f1<this.poolsOfFish.length; f1++) {
                    //process.stdout.write(`.`);
                    //console.log(`  day[${i}], pool[${f1}]: ${this.poolsOfFish[f1]}`);

                    for (let f2=0; f2<this.poolsOfFish[f1].length; f2++) {
                        let hasNewOffspring: boolean = this.poolsOfFish[f1][f2].grow();

                        if (hasNewOffspring) {
                            offsprings.push(new Fish());
                        }
                    }

                    if (this.poolsOfFish.length >= cutoff && offsprings.length > 0) {
                        process.stdout.write(`.`);
                        //console.log(`  day[${i}], pool[${f1}], ${offsprings.length} new offsprings`);
                       
                        while (offsprings.length > 0) {
                            maxPoolSize = Math.max(maxPoolSize, offsprings.length);
                    
                            //console.log('Memory    : ', process.memoryUsage().heapUsed);
                            //console.log(`  day[${i}], pool[${f1}], creating a new pool for total of ${this.poolsOfFish.length}    ${maxPoolSize}`);
                            this.poolsOfFish.push(offsprings.splice(0,Main.POOL_SIZE));
                        }
                    
                        offsprings = [];
                    }
                }
                //console.log(`;`);

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
                if (this.poolsOfFish.length < cutoff && offsprings.length > 0) {
                    process.stdout.write(`*`);
                    console.log(`  day[${i}], ${offsprings.length} new offsprings`);
                   
                    while (offsprings.length > 0) {
                        maxPoolSize = Math.max(maxPoolSize, offsprings.length);
                
                        this.poolsOfFish.push(offsprings.splice(0,Main.POOL_SIZE));
                    }
                    offsprings = [];
                }
            }

            // this.poolsOfFish.map((value, index) => {
            //     console.log(`-- pool[${index}] size: ${value.length}`);
            // });
            return this.poolsOfFish.reduce((acc, cur) => acc+=cur.length, 0);
        };

        simulateDays2 = (days: number): number => {
            return this.growByMath(parseInt(this.poolsOfFish[0][0].age), days);
        };

        
        growByMath = (age: number, days: number): number => {
            if (days < age) {
                console.log(`age:${age}, days:${days} returning 0`);
                return 0;
            }

            let result: number = 0;
            let offsprings: number = Math.max(0, Math.floor((days - age)/7) + 1);
            console.log(`age:${age}, days:${days} -> ${offsprings}`);

            result += offsprings;
            for (let i=0; i<offsprings; i++) {
                let offspringAge = Math.max(0, age-1);
                result += this.growByMath(offspringAge, days-1);
            }


            return result;
        };
    }

    class Fish {
        static readonly DEFAULT_AGE: number = 6; // 7 days in a 0th based counting system
        static readonly MATURITY_OFFSET: number = 2;

        age: string;

        constructor(age: string = ''+ (Fish.DEFAULT_AGE+Fish.MATURITY_OFFSET)) {
            this.age = age;
        }

        toString = (): string => {
            return this.age.toString();
        };

        // Returns true, if it produces an offspring
        grow = (): boolean => {
            if (this.age == '0') {
                this.age = ''+ Fish.DEFAULT_AGE;
                return true
            } else {
                this.age = '' + (parseInt(this.age)-1);
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
console.log(AoC_2021_06.simulateDays2(4)); // 