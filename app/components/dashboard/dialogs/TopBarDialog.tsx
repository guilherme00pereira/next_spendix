import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import {AppBar, Button, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {usePageContext} from "@/app/lib/contexts";

const TopBarDialog = ({title}: {title: string}) => {
    const {showModal, actionShowModal} = usePageContext();

    return (
        <AppBar sx={{position: 'relative'}}>
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
                    onClick={() => actionShowModal(!showModal)}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBarDialog;