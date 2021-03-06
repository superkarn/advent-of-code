namespace AoC._2015_06 {
    export class Main {
        static ACTION_OFF: string = "off";
        static ACTION_ON: string = "on";
        static ACTION_TOGGLE: string = "toggle";
        static ACTION_TURN: string = "turn";

        gridWidth: number = 1000;
        gridHeight: number = 1000;
        grid: LightState[][];

        constructor() {
            this.resetGrid();
        }

        // Reset the grid to all Off
        resetGrid = (): void => {
            this.grid = Array.from(
                Array(this.gridWidth), 
                () => Array(this.gridHeight).fill(LightState.Off)
            );
        };

        getLitGridCount = (list: Instruction[]): number  => {
            for (let i=0; i<list.length; i++) {
                this.flipLights(list[i]);
            }
            //console.log(this.grid);

            return this.countLightsOn();
        };

        flipLights = (ins: Instruction): void => {
            for (let i=ins.StartCorner.X; i<=ins.EndCorner.X; i++) {
                for (let j=ins.StartCorner.Y; j<=ins.EndCorner.Y; j++) {
                    switch (ins.Action) {
                        case Action.Off:
                            this.grid[i][j] = LightState.Off;
                            break;
                            
                        case Action.On:
                            this.grid[i][j] = LightState.On;
                            break;
                            
                        case Action.Toggle:
                            if (this.grid[i][j] == LightState.Off) {
                                this.grid[i][j] = LightState.On;
                            } else {
                                this.grid[i][j] = LightState.Off;
                            }
                            break;
                    }
                }
            }
        };

        countLightsOn = (): number => {
            let result: number = 0;

            for (let i=0; i<this.gridWidth; i++) {
                for (let j=0; j<this.gridHeight; j++) {
                    if (this.grid[i][j] == LightState.On) {
                        result++;
                    }
                }
            }

            return result;
        };

        gitGridBrightness = (list: Instruction[]): number => {
            for (let i=0; i<list.length; i++) {
                this.adjustBrightness(list[i]);
            }
            //console.log(this.grid);

            return this.countBrightness();
        };

        adjustBrightness = (ins: Instruction): void => {
            for (let i=ins.StartCorner.X; i<=ins.EndCorner.X; i++) {
                for (let j=ins.StartCorner.Y; j<=ins.EndCorner.Y; j++) {
                    switch (ins.Action) {
                        case Action.Off:
                            this.grid[i][j]--;
                            if (this.grid[i][j] < 0) {
                                this.grid[i][j] = 0;
                            }
                            break;
                            
                        case Action.On:
                            this.grid[i][j]++;
                            break;
                            
                        case Action.Toggle:
                            this.grid[i][j] += 2;
                            break;
                    }
                }
            }
        };

        countBrightness = (): number => {
            let result: number = 0;

            for (let i=0; i<this.gridWidth; i++) {
                for (let j=0; j<this.gridHeight; j++) {
                    result += this.grid[i][j];
                }
            }

            return result;
        };

        parseInput = (input: string): Instruction[] => {
            return input
                .split('\n')
                .filter((value: string) => value != null)
                .map((value: string) => {
                    let instructionSet = value.split(' ');
                    
                    if (instructionSet.length == 0) {
                        throw new Error("Error parsing instruction.");
                    }

                    let x: Instruction = new Instruction();
                    let i: number = 0; // instruction index; 

                    // Parse action
                    switch(instructionSet[0]) {
                        // Action ON/OFF
                        case Main.ACTION_TURN:
                            switch(instructionSet[1]) {
                                case Main.ACTION_OFF:
                                    x.Action = Action.Off;
                                    break;

                                case Main.ACTION_ON:
                                    x.Action = Action.On;
                                    break;

                                default:
                                    throw new Error("Error parsing inspection action: on/off.");
                            }
                            i = 2;
                            break;

                        // Action Toggle
                        case Main.ACTION_TOGGLE:
                            x.Action = Action.Toggle;
                            i = 1;
                            break;

                        default:
                            throw new Error("Error parsing inspection action.");
                    }

                    // Parse start corner
                    if (instructionSet[i]) {
                        let xy: string[] = instructionSet[i].split(',');
                        let p = new Position();
                        p.X = parseInt(xy[0]);
                        p.Y = parseInt(xy[1]);
                        x.StartCorner = p;
                    }

                    // Parse end corner
                    if (instructionSet[i+2]) {
                        let xy: string[] = instructionSet[i+2].split(',');
                        let p = new Position();
                        p.X = parseInt(xy[0]);
                        p.Y = parseInt(xy[1]);
                        x.EndCorner = p;
                    }

                    return x;
                });
        }
    }

    enum Action {
        Off = 0,
        On = 1,
        Toggle = 2
    }

    enum LightState {
        Off = 0,
        On = 1
    }

    class Position {
        X: number = 0;
        Y: number = 0;

        toString = (): string => {
            return `[${this.X}, ${this.Y}]`;
        };
    }

    class Instruction {
        Action: Action;
        StartCorner: Position;
        EndCorner: Position;
        
        toString = (): string => {
            return `{${this.Action}, ${this.StartCorner.toString()}, ${this.EndCorner.toString()}}`;
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/06/data.txt', {encoding:'utf8'}).toString();

let AoC_2015_06: AoC._2015_06.Main = new AoC._2015_06.Main();
console.log(AoC_2015_06.getLitGridCount(AoC_2015_06.parseInput(input))); // 569999
console.log(AoC_2015_06.gitGridBrightness(AoC_2015_06.parseInput(input))); // 17836115
