mod random;
use random::random_range;
use std::collections::HashSet;

pub type Position = (usize, usize);

#[derive(Debug)]
struct Minesweeper {
    width: usize,
    height: usize,
    open_fields: HashSet<Position>,
    mines: HashSet<Position>,
    flagged_fields: HashSet<Position>,
}

impl Minesweeper {
    pub fn new(width: usize, height: usize, mine_count: usize) -> Minesweeper {
        Minesweeper {
            width,
            height,
            open_fields: HashSet::new(),
            mines: {
                let mut mines = HashSet::new();
                while mines.len() < mine_count {
                    let v1 = random_range(0, width);
                    let v2 = random_range(0, height);
                    mines.insert((v1, v2));
                }
                mines
            },
            flagged_fields: HashSet::new(),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::Minesweeper;

    #[test]
    fn test() {
        let ms = Minesweeper::new(10, 10, 5);
        println!("{:?}", ms);
    }
}
