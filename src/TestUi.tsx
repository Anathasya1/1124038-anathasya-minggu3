import { Box, Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Alarm from "@mui/icons-material/Alarm";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";


export function TestUi() {
    return <Box>
        <Button variant="contained">Test Button</Button>
        <IconButton aria-label="delete">
            <Delete fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" disabled color="primary">
            <Delete fontSize="small"/>
        </IconButton>
        <IconButton color="secondary" aria-label="add an alarm">
            <Alarm />
        </IconButton>
        <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCart />
        </IconButton>
    </Box>
}