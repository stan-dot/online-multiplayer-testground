import { Box, ImageList, TextField, ImageListItem } from "@material-ui/core";
import { Paper } from "@mui/material";
import { io } from 'socket.io-client';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
];

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Results({ data }) {
  console.log("that's data from the server: ", data);
  return <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <Paper elevation={5}  >
      {data.map(value => <Offer value={value} />)}
    </Paper>
  </Box>
}

function Offer({ value }) {
  const city = value.city;
  const link = value.link;
  const price = value.total_cost;
  return <Paper elevation={8}>
    <a href={link}>{city}, for ${price} total cost</a>
  </Paper>
}

/**
 * 
 * 
 * <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
 * 
 */