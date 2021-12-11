namespace AoC._2021_11 {
    export class Main {
        constructor() {}

        parseInput = (input: string): Map => {
            let x = input
                .split('\r\n')
                .filter((value: string) => value != null && value.trim() != '')
                .map((value: string, y: number) => {
                    try {
                        return value.split('')
                                    .map((v2, x) => new Octopus(y, x, parseInt(v2)));
                    } catch (error) {
                        console.log(`error: ${error}`);
                        console.log(`value: ${value}`);
                        throw new Error('Error parsing input');
                    }
                })

            return new Map(x);
        };

        simulate = (map: Map, steps: number): number => {
            for (let i=1; i<=steps; i++) {
                map.step();
            };

            console.log(`After ${steps} steps: \r\n${map.toString()}`);
            return map.countTotalFlashes();
        };
    }

    class Map {
        octopuses: Octopus[][];

        constructor(o: Octopus[][] = []) {
            this.octopuses = o;
        }

        toString = (): string => {
            return this.octopuses.reduce((acc, cur) => {
                return acc + cur.reduce((acc2, cur2) => acc2 + cur2.toString() +',', '') + '\r\n';
            }, '');
        };

        step = (): void => {
            // First pass is to update each Octopus states
            for (let y=0; y<this.octopuses.length; y++) {
                for (let x=0; x<this.octopuses[y].length; x++) {
                    this.octopuses[y][x].incrementEnergy();
                }
            }

            let flashSteps: number = 0;
            // next subsequent passes are flashing
            while (this.hasOctopusesWaitingToFlash()) {
                //console.log(`  flashSteps[${flashSteps}]:\r\n`+ this.toString());
                for (let y=0; y<this.octopuses.length; y++) {
                    for (let x=0; x<this.octopuses[y].length; x++) {
                        // If the current octopus just became energized, then flash the neighbors
                        if (this.octopuses[y][x].state == OctopusState.Energized) {
                            this.flashNeighbors(y, x);
                        }
                    }
                }

                flashSteps++;
            }

            // Last pass is to reset each Octopus
            for (let y=0; y<this.octopuses.length; y++) {
                for (let x=0; x<this.octopuses[y].length; x++) {
                    this.octopuses[y][x].reset();
                }
            }
        };

        countTotalFlashes = (): number => {
            let result: number = 0;
            
            for (let y=0; y<this.octopuses.length; y++) {
                for (let x=0; x<this.octopuses[y].length; x++) {
                    result += this.octopuses[y][x].flashCount;
                }
            }

            return result;
        };

        // Return true if there's at least 1 octopus waiting to flash
        private hasOctopusesWaitingToFlash = (): boolean => {
            for (let y=0; y<this.octopuses.length; y++) {
                for (let x=0; x<this.octopuses[y].length; x++) {
                    if (this.octopuses[y][x].state == OctopusState.Energized) {
                        return true;
                    }
                }
            }

            return false;
        };

        // Return number of octopuses energized after the flash
        private flashNeighbors = (y: number, x: number): number => {
            let result: number = 0;

            this.octopuses[y][x].flash();

            for (let y2=y-1; y2<=y+1; y2++) {
                for (let x2=x-1; x2<=x+1; x2++) {
                    if (0 <= y2 && y2 < this.octopuses.length &&
                        0 <= x2 && x2 < this.octopuses[y2].length) {
                        
                        // Skip self
                        if (x2 == x && y2 == y) {
                            continue;
                        }

                        this.octopuses[y2][x2].incrementEnergy();
                    }
                }
            }

            return result;
        };
    }

    class Octopus {
        state: OctopusState;
        energy: number;
        flashCount: number;

        // for debugging
        x: number;
        y: number;

        constructor(y: number, x: number, e: number = 0) {
            this.state = OctopusState.Default;
            this.energy = e;
            this.flashCount = 0;

            this.x = x;
            this.y = y;
        }

        toString = (): string => {
            let result: string = '';
            //if (this.state == OctopusState.Energized) {
            if (this.energy == 0 || 9 < this.energy) {
                result += `${LogColor.FgMagenta}${this.energy}${LogColor.Reset}`;
            } else {
                result += this.energy;
            }

            return result;
        };

        incrementEnergy = (): void => {
            // Only energize if the energy is currently 9, going to 10
            if (this.energy == 9) {
                this.state = OctopusState.Energized;
            }

            // Energy can go above 9 here.
            this.energy++;
        };

        // This happens only once per step.  It's not the same as
        // being flashed.  Being flashed calls incrementEnergy().
        flash = (): void => {
            //console.log(`    [${this.y}][${this.x}] is flashing because ${this.energy}/${this.state}`);
            this.state = OctopusState.Default;

            if (this.energy > 9) {
                this.flashCount++;
            }
        };

        reset = (): void => {
            if (this.energy > 9) {
                this.energy = 0;
            }

            this.state = OctopusState.Default;
        };
    }

    enum OctopusState {
        Default = 0,
        Energized = 1,
    };
}

fs = require('fs');
input = fs.readFileSync('../../../2021/11/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_11: AoC._2021_11.Main = new AoC._2021_11.Main();
console.log(AoC_2021_11.simulate(AoC_2021_11.parseInput(input), 100)); // 1599
