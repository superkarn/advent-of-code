namespace AoC._2021_02 {
    export class Main {
        CurrentPosition: Position;

        constructor() {
            this.CurrentPosition = new Position();
        }

        parseInput = (input: string): Instruction[] => {
            let result: Instruction[] = input
                .split('\n')
                .filter((value: string) => value != null)
                .map((value: string, i: number) => {
                    let instructionSet = value.split(' ');

                    let x: Instruction = null;
                    try {
                        x = new  Instruction();
                        x.Direction = instructionSet[0] as Direction;
                        x.Distance = parseInt(instructionSet[1]);
                    } catch (error) {
                        console.error(`Error parsing input at ${i} position.`);
                    }

                    return x;
                });

            return result;
        }

        travel = (list: Instruction[]): number => {
            for (let i=0; i<list.length; i++) {
                switch (list[i].Direction) {
                    case Direction.Forward:
                        this.CurrentPosition.forward(list[i].Distance);
                        break;
                        
                    case Direction.Up:
                        this.CurrentPosition.up(list[i].Distance);
                        break;
                        
                    case Direction.Down:
                        this.CurrentPosition.down(list[i].Distance);
                        break;
                }
            }

            return this.CurrentPosition.getMultiple();
        };
        
        travel2 = (list: Instruction[]): number => {
            for (let i=0; i<list.length; i++) {
                switch (list[i].Direction) {
                    case Direction.Forward:
                        this.CurrentPosition.forward2(list[i].Distance);
                        break;
                        
                    case Direction.Up:
                        this.CurrentPosition.up2(list[i].Distance);
                        break;
                        
                    case Direction.Down:
                        this.CurrentPosition.down2(list[i].Distance);
                        break;
                }
            }

            return this.CurrentPosition.getMultiple();
        };
    }

    enum Direction {
        Forward = 'forward',
        Down = 'down',
        Up = 'up'
    }

    class Position {
        X: number = 0;
        Y: number = 0;
        Aim: number = 0;
        
        toString = (): string => {
            return `[${this.X}, ${this.Y}: ${this.Aim}]`;
        };
        
        down = (input: number): void => {
            this.Y += input
        };

        forward = (input: number): void => {
            this.X += input
        };
        
        up = (input: number): void => {
            this.Y -= input
        };
        
        down2 = (input: number): void => {
            this.Aim += input
        };

        forward2 = (input: number): void => {
            this.X += input
            this.Y += input * this.Aim;
        };
        
        up2 = (input: number): void => {
            this.Aim -= input
        };
        
        getMultiple = (): number => {
            return this.X * this.Y;
        };
    }

    class Instruction {
        Direction: Direction;
        Distance: number;
        
        toString = (): string => {
            return `{${this.Direction}, ${this.Distance}}`;
        }; 
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2021/02/data.txt', {encoding:'utf8'}).toString();

let AoC_2021_02: AoC._2021_02.Main = new AoC._2021_02.Main();
console.log(AoC_2021_02.travel(AoC_2021_02.parseInput(input))); // 2150351
console.log(AoC_2021_02.travel2(AoC_2021_02.parseInput(input))); // 3689785148
