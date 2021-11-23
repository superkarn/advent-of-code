namespace AoC {
    export class AoC_2015_03 {
        getHousesCount = (list: string): number  => {
            // The current position in the grid: x,y
            let x: number = 0;
            let y: number = 0;

            // The grid, with starting position 0,0
            // - right is positive x
            // - top is positive y
            let grid = [];
            grid.push([x,y]);            
            
            for (let i=0; i<list.length; i++) {
                //console.log(`${i}: ${list[i]}`);

                switch(list[i]) {
                    case '^': // north
                        y++;
                        break;
                        
                    case '>': // east
                        x++;
                        break;
                        
                    case 'v': // south
                        y--;
                        break;
                        
                    case '<': // east
                        x--;
                        break;
                }
                
                grid.push([x,y]);
                //console.log(`   `, grid);
            }

            // remove duplicates
            grid = this.getDistinctItems(grid);

            //console.log(`g  `, grid.length, grid);
            return grid.length;
        };

        getDistinctItems = (list: any[]): any[] => {
            // 1. map int[][] into string[]
            // 2. filter out duplicates
            // 3. map string[] back to int[][]
            return list.map(item => `${item[0]}-${item[1]}`)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .map(item => [parseInt( item.split('-')[0]), parseInt( item.split('-')[1])]);
        };
    }
}

fs = require('fs');
input = fs.readFileSync('../../../2015/03/data.txt', {encoding:'utf8'}).toString();

let aoc_2015_03: AoC.AoC_2015_03 = new AoC.AoC_2015_03();
console.log(aoc_2015_03.getHousesCount(input)); // 2592
