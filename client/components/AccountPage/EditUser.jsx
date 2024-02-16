import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

import { usePatchUserMutation, useGetAccountQuery } from "../../redux/api";
import { useState } from "react";

const EditUser = () => {
    const navigate = useNavigate();

    const { data, isLoading, error: userError } = useGetAccountQuery(id);
    const [patchUser, { error }] = usePatchUserMutation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);



    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await patchUser({ username, email, password });
            navigate("/account");
        }
        catch (error) {
            console.error(error)
        }
    }
    if (error) {
        console.error(error)
    }
    if (isLoading) {
        return <div> </div>
    }

    return userData && (
        <>
            <Card sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Update Your Account:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Update Username"
                            //defaultValue={userData[0].username}
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
                    </Stack>
                </form>
            </Card>
        </>
    )
}

export default EditUser;