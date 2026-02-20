import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import "./css/PostDetail.css"
import NavBar from "../components/NavBar";
import type { Post } from "../types"

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/post/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [id])

    const back = () => {
        navigate(-1);
    }

    // if (!post) {
    //     return <div>Post not found</div>
    // }

    if (!post) {
        return <div>Loading..</div>
    }

    return (
        <>
            <NavBar />
            <div className="detail-wrapper">
                <div id="container">
                    <div className="post-title">Title: {post.title}</div>
                    <div className="post-content">Content: {post.content}</div>

                    <div style={{ marginTop: '20px' }}>
                        <button className="back-button" onClick={back}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

    //kalau ga mau pake if langsung aja pake tanda taanya
    // return <div>
    //     <div>title: {post?.title}</div>
    //     <div>content: {post?.content}</div>
    // </div>
}