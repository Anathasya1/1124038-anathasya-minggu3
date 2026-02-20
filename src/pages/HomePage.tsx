import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import PostModal from "../components/PostModal";
import NavBar from "../components/NavBar";
// import PostListPage from "./PostListPage";


export default function HomePage() {
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/post', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }
            });
            const data = await res.json();

            setPosts(data.records || []);
        } catch (error) {
            console.error("Gagal ambil postingan:", error);
            setPosts([]);
        }
    };

    console.log("Isi userInfo saat ini:", userInfo);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <h1>Selamat Datang di Forum, {userInfo?.name}!</h1>

                    {userInfo && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsModalOpen(true)}>
                            + Tambah Post
                        </Button>
                    )}
                </Box>

                <Stack spacing={2}>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <Card key={post.id} variant="outlined" sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {post.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography color="textSecondary" textAlign="center">
                            Belum ada postingan.
                        </Typography>
                    )}
                </Stack>

                <PostModal
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        fetchPosts();
                    }}
                />
            </div>
        </>
    )

    //return <PostListPage />
}