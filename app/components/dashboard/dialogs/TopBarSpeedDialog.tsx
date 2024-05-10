import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import {AppBar, Button, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const TopBarSpeedDialog = ({title, showDialog, closeAction}: {title: string, showDialog: boolean, closeAction: (action: boolean) => void}) => {

    return (
        <AppBar sx={{position: 'relative'}} color='primary'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    {title}
                </Typography>
                <Button variant="contained" size="large" type="submit">
                    Salvar
                </Button>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => closeAction(!showDialog)}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBarSpeedDialog;