import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import "./PostDetail.css"


type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    user: {
        name: string;
    }
}

export default function PostDetail() {
    const {id} = useParams();
    const [post, setPost] = useState<Post>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/post/${id}`);
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [id])

    const back = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchPost = async() => {
            const response = await fetch(`/api/post/${id}`)
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Post not found</div>
    }

    return <div className="detail-wrapper">
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

    //kalau ga mau pake if langsung aja pake tanda taanya
    // return <div>
    //     <div>title: {post?.title}</div>
    //     <div>content: {post?.content}</div>
    // </div>
}