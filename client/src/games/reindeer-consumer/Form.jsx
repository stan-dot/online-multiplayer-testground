import * as React from 'react';
// import { Paper } from '@material-ui/core';
// import Box from '@material-ui/core/Box';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import { useState } from 'react';
// import { io } from 'socket.io-client';
// import { currencies } from './helpers/currencies';
// import { MyButton } from './helpers/Elements';
// import { MyContainerGrid, MyTextField } from './helpers/MyContainerGrid';

// const DEFAULT_VALUES = {
//   MIN_LENGTH: 5,
//   BUDGET: 2000,
//   CITY: "London",
//   CURRENCY: 'GBP',
//   NUMBER: 2,
//   DATE : [new Date(), new Date()]

// }
// /**
//  * PARAMETERS FOR SEARCH
//  * money per person
//  * number of people
//  * city
//  * time
//  * @returns 
//  */
// export default function Form({callback}) {
//   const socket = io()
//   socket.on("data", data => {
//     console.log("sending data to display to results element");
//     callback(data)
//   })
//   const [dateStatus, onDateChange] = useState(DEFAULT_VALUES.DATE);
//   const [people, setNumberOfPeople] = useState(DEFAULT_VALUES.NUMBER);
//   const [budget, setBudget] = useState(DEFAULT_VALUES.BUDGET);
//   const [currency, setCurrency] = useState(DEFAULT_VALUES.CURRENCY);
//   const [city, setCity] = useState(DEFAULT_VALUES.CITY);

//   const resetForm = () => {
//     onDateChange(DEFAULT_VALUES.DATE);
//     setBudget(DEFAULT_VALUES.BUDGET)
//     setCurrency(DEFAULT_VALUES.CURRENCY);
//     setCity(DEFAULT_VALUES.CITY);
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     const diffTime = Math.max(Math.abs(dateStatus[0] - dateStatus[1]), DEFAULT_VALUES.MIN_LENGTH)
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     // example input {\"city\": \"New York\",\"budget\": 1700,\"currency\": \"GBP\",\"days\": 1,\"people\": 1}
//     const formData = {
//       city: city,
//       budget: budget,
//       currency: currency,
//       days: diffDays,
//       people: people,
//     }
//     console.log(formData);
//     socket.emit("query", formData)
//     resetForm();
//   };

//   return <Box
//     component="form"
//     sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
//     noValidate
//     autoComplete="off"
//   >
//     <Paper elevation={5}>
//       <MyContainerGrid>
//         <MyTextField str="budget-per-person" callback={setBudget} />
//         <MyTextField str="city" callback={setCity} />
//         <TextField
//           id="outlined-select-group-size"
//           select
//           label="2"
//           helperText="Number of travellers"
//           style={{ minHeight: '10vh' }}
//           onClick={setNumberOfPeople}
//         >
//           {[...Array(6)].map((_, i) => i).map(value => (
//             < MenuItem key={"key-" + value} value={value}>
//               {value}
//             </MenuItem>
//           ))}
//         </TextField>
//         <DateRangePicker
//           fontFamily={"sans-serif"}
//           value={dateStatus}
//           onChange={onDateChange}
//           style={{ minHeight: '10vh' }}
//         />
//         <TextField
//           id="outlined-select-currency"
//           select
//           label="Select"
//           value={currency}
//           onChange={setCurrency}
//           helperText="Please select your currency"
//           style={{ minHeight: '10vh' }}
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       </MyContainerGrid>
//       <MyContainerGrid>
//         <ButtonGroup variant='contained' aria-label="outlined primary button group" >
//           <MyButton name={"submit"} callback={handleSubmit} />
//           <MyButton name={"reset"} callback={resetForm} />
//         </ButtonGroup>
//       </MyContainerGrid>
//     </Paper>
//   </Box >
// }


