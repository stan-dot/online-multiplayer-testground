mod random;
use random::random_range;
use std::{
    collections::HashSet,
    fmt::{Display, Write},
};

pub type Position = (usize, usize);

pub enum OpenResult {
    Mine,
    NoMine(u8),
}

#[derive(Debug)]
struct Minesweeper {
    width: usize,
    height: usize,
    open_fields: HashSet<Position>,
    mines: HashSet<Position>,
    flagged_fields: HashSet<Position>,
}

impl Display for Minesweeper {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for y in 0..self.height {
            for x in 0..self.width {
                let pos = (x, y);
                if !self.open_fields.contains(&pos) {
                    f.write_str("🟪 ")?;
                } else if self.mines.contains(&pos) {
                    f.write_str("💣 ")?;
                } else {
                    let num = self.clone().neighboring_mines(pos);
                    write!(f, " {} ", num)?;
                }
            }

            f.write_char('\n')?;
        }
        Ok(())
    }
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

    fn iter_neighbors(&self, (x, y): Position) -> impl Iterator<Item = Position> {
        let width = self.width;
        let height = self.height;
        (x.min(1) - 1..=(x + 1).min(width - 1))
            .flat_map(move |i| (y.min(1) - 1..=(y + 1).min(height - 1)).map(move |j| (i, j)))
            .filter(move |&pos| pos != (x, y))
    }

    fn neighboring_mines(&self, pos: Position) -> u8 {
         self
            .iter_neighbors(pos)
            .filter(|pos| self.mines.contains(pos))
            .count() as u8
        // u8::from(num)
        // num as u8
        // as u8;
    }

    pub fn open(&mut self, position: Position) -> OpenResult {
        self.open_fields.insert(position);
        let is_mine = self.mines.contains(&position);

        if is_mine {
            OpenResult::Mine
        } else {
            OpenResult::NoMine(0)
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::Minesweeper;

    #[test]
    fn test() {
        let mut ms = Minesweeper::new(10, 10, 5);

        ms.open((5, 5));
        // println!("{:?}", ms); // this prints value
        println!("{}", ms); // this calls the Display impl
    }
}
