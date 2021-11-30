namespace AoC._2015_06 {
    export class Main {
        static ACTION_OFF: string = "off";
        static ACTION_ON: string = "on";
        static ACTION_TOGGLE: string = "toggle";
        static ACTION_TURN: string = "turn";

        getLitGridCount = (list: Instruction[]): number  => {
            let result: number = 0;
            
            console.log(list);

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
console.log(AoC_2015_06.getLitGridCount(AoC_2015_06.parseInput(input))); // 
