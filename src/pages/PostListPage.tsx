import { useEffect, useMemo, useState } from "react";
//import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router";
import "./css/PostList.css";
import NavBar from "../components/NavBar";
import { usePosts } from "../hooks/usePosts";

type Post = {
    id: string,
    createdAt: string,
    deletedAt: string,
    title: string,
    content: string,
    status: string,
    user: {
        name: string,
    }
    userId: string
}

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme }) => ({
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
//     variants: [
//         {
//             props: ({ expand }) => !expand,
//             style: { transform: 'rotate(0deg)' },
//         },
//         {
//             props: ({ expand }) => !!expand,
//             style: { transform: 'rotate(180deg)' },
//         },
//     ],
// }));


export default function PostList() { //pake default di router
    // const [posts, setPosts] = useState<Post[]>([]);
    const { posts, reload, state } = usePosts();
    const [expandedId, setExpandedId] = useState<Record<string, boolean>>({});

    const handleExpandClick = (id: string) => {
        setExpandedId((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [sortBy, setSortBy] = useState<string>();
    const [isSortAscending, setIsSortAscending] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    const navigate = useNavigate();

    const goToPost = (id: string) => {
        navigate(`/post/${id}`);
    }

    const sortedPosts = useMemo(() => {

        let filteredResult = posts.filter((post) => {
            const searchData = search.toLowerCase();
            return (
                post.title.toLowerCase().includes(searchData) ||
                post.content.toLowerCase().includes(searchData)
            );
        })


        if (sortBy === undefined) {
            return filteredResult
        }
        const direction = isSortAscending ? 1 : -1;

        filteredResult.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title > b.title ? direction : -direction;
                case 'userName':
                    return a.user.name > b.user.name ? direction : -direction;
                case 'createdAt':
                    return a.createdAt > b.createdAt ? direction : -direction;
                default:
                    return 0;
            }
        });

        return filteredResult;

        // const result = [ ...posts];
        // const direction = isSortAscending ? 1 : -1;
        // result.sort((a, b) => {
        //     switch (sortBy) {
        //         case 'title':
        //             return a.title > b.title ? direction : -direction;
        //             break;
        //         case 'userName':
        //             return a.user.name > b.user.name ? direction : -direction;
        //             break;
        //         case 'createdAt':
        //             return a.createdAt > b.createdAt ? direction : -direction;
        //             break;

        //         default:
        //             break;
        //     }
        //     return 0;
        // });
        // return result;
    }, [posts, sortBy, isSortAscending, search]);

    // const handleSortByCreatedAt = useMemo(() => {
    //     const sortedData = [...posts].sort((a,b) => {
    //         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); //ini desc
    //         //return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); //ini asc
    //     }, [posts, setOrde]);
    // ) 
    // }

    // const handleSortByTitle = () => {
    //     const sorted = [...posts].sort((a, b) => {
    //         return a.title.localeCompare(b.title)
    //     });
    //     setPosts(sorted);
    // }

    // useEffect(() => {
    //     async function reloadPost() {
    //         try {
    //             const response = await fetch('http://localhost:5173/api/post');
    //             if (response.status !== 200) {
    //                 alert("fail to reload post");
    //                 return;
    //             }
    //             const data = await response.json();
    //             setPosts(data.records);
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //         }
    //     }
    //     reloadPost();
    // }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    return (
        <>
            <NavBar />

            <Container sx={{ py: 4 }}>
                <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>Post List</Typography>

                <div className="header-actions">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by title or content..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="sort-container">
                        <button className="sort-button" onClick={() => { setSortBy('title'); setIsSortAscending(!isSortAscending); }}>
                            Sort by Title {sortBy === 'title' ? (isSortAscending ? '↑' : '↓') : ''}
                        </button>
                        <button className="sort-button" onClick={() => { setSortBy('userName'); setIsSortAscending(!isSortAscending); }}>
                            Sort by User {sortBy === 'userName' ? (isSortAscending ? '↑' : '↓') : ''}
                        </button>
                        <button className="sort-button" onClick={() => { setSortBy('createdAt'); setIsSortAscending(!isSortAscending); }}>
                            Sort by Date {sortBy === 'createdAt' ? (isSortAscending ? '↑' : '↓') : ''}
                        </button>
                        {/* mundur 1 halaman yg navigate -1 */}
                        <button className="sort-button" onClick={() => navigate(-1)}>
                            &larr; back
                        </button>
                    </div>
                </div>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                    {sortedPosts.map((post) => (
                        <Card key={post.id} sx={{ maxWidth: 600, width: '100%' }}>
                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: red[500] }}>{post.user.name.charAt(0).toUpperCase()}</Avatar>}
                                action={<IconButton><MoreVertIcon /></IconButton>}
                                title={post.title}
                                subheader={`By ${post.user.name} • ${new Date(post.createdAt).toLocaleDateString()}`}
                            />
                            <CardContent className="post-content-area">
                                <Typography variant="body2" className="post-description" sx={{ color: 'text.secondary' }}>{post.content}</Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton><FavoriteIcon /></IconButton>
                                <IconButton><ShareIcon /></IconButton>
                                <button className="btn-detail" onClick={() => goToPost(post.id)}>detail</button>

                                <IconButton
                                    className={`expand-more ${expandedId[post.id] ? 'expanded' : 'collapsed'}`}
                                    onClick={() => handleExpandClick(post.id)}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>

                            <Collapse in={expandedId[post.id]} timeout="auto" unmountOnExit>
                                <CardContent sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                                    <Typography variant="caption" display="block">ID: {post.id}</Typography>
                                    <Typography variant="caption" display="block">Status: {post.status}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}
                </Box>
            </Container>
        </>
    );
}