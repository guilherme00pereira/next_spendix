import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';

const DialogActionButtons = ({showDialog, closeAction}: {showDialog: boolean, closeAction: (action: boolean) => void}) => {
    return (
        <DialogActions>
          <Button size="small" onClick={() => closeAction(!showDialog)}>
            Cancelar
          </Button>
          <Button variant='contained' size="small" type="submit">Salvar</Button>
        </DialogActions>
    );
};

export default DialogActionButtons;