#[cfg(feature = "buddy-alloc")]
mod alloc;
mod wasm4;
use wasm4::*;

use crate::wasm4::*;

const FONT_WIDTH: u32 = 208;
const FONT_FLAGS: u32 = BLIT_1BPP;
const CHAR_WIDTH: u32 = 8;
const CHAR_HEIGHT: u32 = 8;
const CHARSET: &str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FONT: &'static [u8] = &[
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x1c, 0x1c, 0x3c, 0x18, 0x3e,
    0x1c, 0x26, 0x10, 0x2c, 0x12, 0x08, 0x24, 0x26, 0x1c, 0x3c, 0x1c, 0x78, 0x1c, 0x3c, 0x62, 0x42,
    0x82, 0xc4, 0x42, 0x66, 0x08, 0x32, 0x22, 0x52, 0x24, 0x51, 0x22, 0x25, 0x28, 0x14, 0x14, 0x08,
    0x24, 0x26, 0x22, 0x52, 0x22, 0xa4, 0x22, 0x52, 0x22, 0xa5, 0x44, 0x2a, 0x24, 0x1c, 0x14, 0x52,
    0x20, 0x12, 0x20, 0x10, 0x20, 0x26, 0x28, 0x04, 0x14, 0x08, 0x2c, 0x24, 0x22, 0x52, 0x22, 0xa4,
    0x20, 0x10, 0x22, 0x24, 0x54, 0x10, 0x24, 0x04, 0x14, 0x5c, 0x40, 0x22, 0x38, 0x38, 0x4e, 0x7c,
    0x28, 0x08, 0x28, 0x10, 0x54, 0x58, 0x42, 0x14, 0x44, 0x78, 0x18, 0x10, 0x24, 0x28, 0x54, 0x10,
    0x14, 0x08, 0x24, 0xa4, 0x40, 0x62, 0x40, 0x20, 0x44, 0x48, 0x10, 0x08, 0x34, 0x30, 0x54, 0x48,
    0x44, 0x20, 0x54, 0x48, 0x04, 0x20, 0x44, 0x28, 0x2c, 0x28, 0x08, 0x10, 0x3c, 0xa4, 0x42, 0xa4,
    0x44, 0xa0, 0x44, 0xc9, 0x10, 0x48, 0x24, 0x52, 0x44, 0x4a, 0x44, 0xa0, 0x3a, 0x48, 0x44, 0xa0,
    0x44, 0x10, 0x28, 0xa8, 0x48, 0x38, 0x42, 0x5b, 0x3c, 0x58, 0x38, 0x40, 0x38, 0x46, 0x68, 0x34,
    0x42, 0x2c, 0x82, 0x84, 0x3a, 0x40, 0x08, 0x86, 0x38, 0x40, 0x3a, 0x10, 0x48, 0x46, 0x30, 0x66,
];

fn draw_space(x: i32, y: i32, column: u32, line: u32, colors: u16) {
    unsafe { *DRAW_COLORS = *DRAW_COLORS & 0x0F }
    rect(
        x + (column * CHAR_WIDTH) as i32,
        y + (line * CHAR_HEIGHT) as i32,
        CHAR_WIDTH,
        CHAR_HEIGHT,
    );
    unsafe { *DRAW_COLORS = colors }
}

pub fn write(text: &str, x: i32, y: i32, colors: u16) {
    // Set draw colors...
    unsafe { *DRAW_COLORS = colors }

    // Line and column counters.
    let mut line: u32 = 0;
    let mut column: u32 = 0;

    // Iterate through each character...
    for c in text.chars() {
        let char_code = c as u32;

        // Break into next line when encounter a "\n" (newline)...
        if char_code == 10 {
            line += 1;
            column = 0;
            continue;
        }

        // Character index on charset.
        let char_index: u32;

        match CHARSET.find(c) {
            Some(x) => char_index = x as u32,

            // Skip invalid characters, spaces, etc.
            None => {
                draw_space(x, y, column, line, colors);
                column += 1;
                continue;
            }
        }

        // Draw character...
        blit_sub(
            FONT,
            x + (column * CHAR_WIDTH) as i32,
            y + (line * CHAR_HEIGHT) as i32,
            CHAR_WIDTH,
            CHAR_HEIGHT,
            char_index * CHAR_WIDTH,
            0,
            FONT_WIDTH,
            FONT_FLAGS,
        );

        // Advance to next column...
        column += 1;
    }
}

#[rustfmt::skip]
const SMILEY: [u8; 8] = [
    0b11000011,
    0b10000001,
    0b00100100,
    0b00100100,
    0b00000000,
    0b00100100,
    0b10011001,
    0b11000011,
];

fn pixel(x: i32, y: i32) {
    // The byte index into the framebuffer that contains (x, y)
    let idx = (y as usize * 160 + x as usize) >> 2;

    // Calculate the bits within the byte that corresponds to our position
    let shift = (x as u8 & 0b11) << 1;
    let mask = 0b11 << shift;

    unsafe {
        let palette_color: u8 = (*DRAW_COLORS & 0xf) as u8;
        if palette_color == 0 {
            // Transparent
            return;
        }
        let color = (palette_color - 1) & 0b11;

        let framebuffer = &mut *FRAMEBUFFER;

        framebuffer[idx] = (color << shift) | (framebuffer[idx] & !mask);
    }
}

// unsafe {
//     *PALETTE = [
//         0xfff6d3,
//         0xf9a875,
//         0xeb6b6f,
//         0x7c3f58,
//     ];
// }

static mut PREVIOUS_GAMEPAD: u8 = 0;

#[no_mangle]
fn update() {
    rect(10, 10, 32, 32);
    unsafe { *DRAW_COLORS = 0x42 }
    text("Hello from Rust!", 10, 10);

    unsafe {
        (&mut *FRAMEBUFFER).fill(3 | (3 << 2) | (3 << 4) | (3 << 6));
    }

    // GAMEPAD
    let gamepad = unsafe { *GAMEPAD1 };
    if gamepad & BUTTON_1 != 0 {
        unsafe { *DRAW_COLORS = 4 }
    }
    if gamepad & BUTTON_RIGHT != 0 {
        trace("Right button is down!");
    }

    let (pressed_this_frame, ..) = unsafe {
        let previous = PREVIOUS_GAMEPAD;
        let gamepad = *GAMEPAD1;
        // Only the buttons that were pressed down this frame
        let pressed_this_frame = gamepad & (gamepad ^ previous);
        PREVIOUS_GAMEPAD = gamepad;

        (pressed_this_frame, gamepad, previous)
    };

    if pressed_this_frame & BUTTON_RIGHT != 0 {
        trace("Right button was just pressed!");
    }

    // MOUSE
    let mouse = unsafe { *MOUSE_BUTTONS };
    let mouse_x = unsafe { *MOUSE_X };
    let mouse_y = unsafe { *MOUSE_Y };

    if mouse & MOUSE_LEFT != 0 {
        unsafe { *DRAW_COLORS = 4 }
        rect(i32::from(mouse_x) - 8, i32::from(mouse_y) - 8, 16, 16);
    } else {
        unsafe { *DRAW_COLORS = 2 }
        rect(i32::from(mouse_x) - 4, i32::from(mouse_y) - 4, 8, 8);
    }

    // PRINTED ITEMS
    blit(&SMILEY, 76, 76, 8, 8, BLIT_1BPP | BLIT_FLIP_Y);
    text("Press X to blink", 16, 90);
    pixel(20, 20);

    // Press UP to jump!
    text(b"Press \x86 to jump!", 10, 10);
    write("HELLO WORLD WITH\nOUR CUSTOM FONT", 4, 4, 0x30);
    // tone(262 | (523 << 16), 60, 100, TONE_PULSE1 | TONE_MODE3);

    let game_data: i32 = 1337;

    unsafe {
        let game_data_bytes = game_data.to_le_bytes();
        diskw(game_data_bytes.as_ptr(), core::mem::size_of::<i32>() as u32);
    }

    let game_data = unsafe {
        let mut buffer = [0u8; core::mem::size_of::<i32>()];

        diskr(buffer.as_mut_ptr(), buffer.len() as u32);

        i32::from_le_bytes(buffer)
    };
}
