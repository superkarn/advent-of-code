//use std::error::Error;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;
use std::io::Lines;
use std::path::Path;

fn main () {
    let lines = get_lines_from_file_name("./data.txt");

    let mut result: i32 = 0;
    for line in lines {
        match line {
            Ok(line) => {
                //println!("{}", line);
                let a1 = get_first_number(&line);
                let a2 = get_last_number(&line);

                result += (a1 * 10) + a2;
                //println!("  {} <-- adding {}", result, (a1 * 10) + a2);
            },
            Err(e) => println!("ERROR: {}", e),
        }
    }

    println!("Result: {}", result);
}


// 01 Utilities ------------------------------
fn get_first_number(line: &str) -> i32 {
    for a in line.chars() {
        match a {
            '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' => {
                //println!("  First number: {}", a);
                return a as i32 - 0x30; // https://stackoverflow.com/a/66590374
            },
            _ => { }
        }
    }
    return -1;
}
fn get_last_number(line: &str) -> i32 {
    for a in line.chars().rev() {
        match a {
            '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' => {
                //println!("  Last number {}", a);
                return a as i32 - 0x30; // https://stackoverflow.com/a/66590374
            },
            _ => { }
        }
    }
    return -1;
}


// Common Utilities ------------------------------

fn get_lines_from_file_name(file_name: &str) -> Lines<BufReader<File>> {
    let path = Path::new(file_name);
    let display = path.display();
    let file = match File::open(&path) {
        Err(why) => panic!("couldn't open {}: {}", display, why),
        Ok(file) => file,
    };
    let reader = BufReader::new(file);
    let lines = reader.lines();
    return lines;
}

// https://stackoverflow.com/a/58119924
// fn print_type_of<T>(_: &T) {
//     println!("{}", std::any::type_name::<T>())
// }