import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface PostModalProps {
    open: boolean;
    onClose: () => void;
    editData?: any;
}

export default function PostModal({ open, onClose, editData }: PostModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem('token');

    useEffect(() => {
        setTitle(editData?.title || ""); 
        setContent(editData?.content || "");
    }, [editData, open]);
    
    const handleSave = async () => {
        const isEdit = !!editData;
        const url = isEdit 
            ? `/api/post/${editData.id}` 
            : '/api/post';

        await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}`},
            body: JSON.stringify({ title, content })
        });

        alert("Sukses!");
        onClose(); 
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                {editData ? "Edit Postingan" : "Add Postingan Baru"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} mt={1}>
                    <TextField 
                        label="Judul Postingan" 
                        fullWidth 
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField 
                        label="share content disini" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    {editData ? "Update Post" : "Save Post"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}