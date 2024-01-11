import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import {Button, Typography} from "@mui/material";
import {DeleteConfirmDialogProps} from "@/types/interfaces";

const ConfirmDeleteDialog = ({entity, open, handleClose, handleDelete}: DeleteConfirmDialogProps) => {

    return (
        <Dialog maxWidth="xs" open={open}>
            <DialogTitle>
                <Typography variant="h6" component="div">
                    Deletar {entity.name}?
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Deseja realmente deletar a {entity.type} {entity.name}?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => handleClose(false)} color="error">
                    Cancelar
                </Button>
                <Button onClick={handleDelete} color="success">
                    Deletar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;