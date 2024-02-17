import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useNavigate, useParams } from "react-router-dom";

import { usePatchUserMutation, useGetAccountQuery } from "../../redux/api";
import { useState } from "react";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error: userError } = useGetAccountQuery(id);
    const [patchUser, { error }] = usePatchUserMutation();
    console.log(data)

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);

    if (isLoading) {
        return <div> </div>
    }
    if (userError) {
        console.error(userError)
    }
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

    const populateForm = (event) => {
        event.preventDefault();
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
    }
// TODO: update styling on bottom buttons
    return data && (
        <div>
            <Button onClick={populateForm}>
                Populate Form
            </Button>
            <Card sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Update Your Account:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Update Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="outlined"
                            sx={{ m: 1, }}
                        />
                        <TextField
                            label="Update Email"
                            value={email}
                            onChange={(event) => setUsername(event.target.value)}
                            type="email"
                            size="small"
                            variant="outlined"
                            sx={{ m: 1, }}
                        />
                        <TextField
                            label="Update Phone"
                            value={phone}
                            onChange={(event) => setUsername(event.target.value)}
                            type="tel"
                            size="small"
                            variant="outlined"
                            sx={{ m: 1, }}
                        />
                        <TextField
                            label="Update Password"
                            value={password}
                            onChange={(event) => setUsername(event.target.value)}
                            type="password"
                            size="small"
                            variant="outlined"
                            sx={{ m: 1, }}
                        />
                        <TextField
                            label="Re-enter Updated Password"
                            value={secondPassword}
                            onChange={(event) => setUsername(event.target.value)}
                            type="password"
                            size="small"
                            variant="outlined"
                            sx={{ m: 1, }}
                            error={
                                !!(password && secondPassword !== secondPassword)
                            }
                            helperText={
                                password && secondPassword && password !== secondPassword ?
                                    <Alert severity="error"> Passwords do not match </Alert> : null
                            }
                        />
                        <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                            Save Changes
                        </Button>
                        <Button
                            onClick={() => navigate("/account")}
                            sx={{ textTransform: "none", backgroundColor: "#D7E462", color: "black", mx: 3, p: 1 }}>
                            <Typography>
                                Cancel
                            </Typography>
                        </Button>
                    </Stack>
                </form>
            </Card>
        </div>
    )
}

export default EditUser;