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

    return data && (
        <div>
            <Card sx={{ p: 3, m: 5, backgroundColor: "white" }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Update Your Account:
                </Typography>
                <Typography textAlign="center">
                    <Button onClick={populateForm} sx={{backgroundColor: "#8DAF83", color: "black", textTransform: "none", px: 2, py: 1, fontWeight: "bold" }}>
                        Populate Form
                    </Button>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Update Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1, backgroundColor: "white"}}
                        />
                        <TextField
                            label="Update Email"
                            value={email}
                            onChange={(event) => setUsername(event.target.value)}
                            type="email"
                            size="small"
                            variant="filled"
                            sx={{ m: 1, backgroundColor: "white"}}
                        />
                        <TextField
                            label="Update Phone"
                            value={phone}
                            onChange={(event) => setUsername(event.target.value)}
                            type="tel"
                            size="small"
                            variant="filled"
                            sx={{ m: 1, backgroundColor: "white"}}
                        />
                        <TextField
                            label="Update Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            size="small"
                            variant="filled"
                            sx={{ m: 1, backgroundColor: "white"}}
                        />
                        <TextField
                            label="Re-enter Updated Password"
                            value={secondPassword}
                            onChange={(event) => setSecondPassword(event.target.value)}
                            type="password"
                            size="small"
                            variant="filled"
                            sx={{ m: 1, backgroundColor: "white"}}
                            error={
                                !!(password && secondPassword !== secondPassword)
                            }
                            helperText={
                                password && secondPassword && password !== secondPassword ?
                                    <Alert severity="error"> Passwords do not match </Alert> : null
                            }
                        />
                        <Typography textAlign="center">
                            <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#8DAF83", color: "black", my: 2, p: 1, fontWeight: "bold" }}>
                                Save Changes
                            </Button>
                        </Typography>
                        <Typography textAlign="center">
                            <Button
                                onClick={() => navigate("/account")}
                                sx={{ textTransform: "none", backgroundColor: "#A9C6EF", color: "black", p: 1, fontWeight: "bold" }}>
                                Cancel
                            </Button>
                        </Typography>
                    </Stack>
                </form>
            </Card>
        </div>
    )
}

export default EditUser;