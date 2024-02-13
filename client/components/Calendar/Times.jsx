import MenuItem from '@mui/material/MenuItem';

const Times = () => {
    const time = [];
    for (let i = 9; i < 18; i++) {
        for (let j = 0; j < 46; j += 15) {
            let minute = j;
            if (j === 0) {
                minute = "00";

            if (i > 12) {
                time.push()
                //<MenuItem value={`${i}:${minute}`}>{`${i-12}:${minute} PM`}</MenuItem>
            } else {
                //<MenuItem value={`${i}:${minute}`}>{`${i}:${minute} AM`}</MenuItem>
            }
        }
        }
    }
    return (
        <>
            {/* <MenuItem value={"09:00"}>9 AM</MenuItem>
            <MenuItem value={"09:15"}>9:15 AM</MenuItem>
            <MenuItem value={"09:30"}>9:30 AM</MenuItem>
            <MenuItem value={"09:00"}>9 AM</MenuItem>
            <MenuItem value={"09:00"}>9 AM</MenuItem>
            <MenuItem value={"09:00"}>9 AM</MenuItem>
            <MenuItem value={"09:00"}>9 AM</MenuItem> */}
        </>
    )
}

export default Times;