import { useEffect, useState } from "react"
import axios from 'axios'

export function Posts(){

    const [posts, setPosts] = useState(null);
    const [isError, setIsError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
        try {
            const url = "https://jsonplaceholder.typicode.com/posts";
            const data = await axios.get(url);
            
            setPosts(data.data);


        } catch (error) {
            console.log("Error")
        }}

        fetchData();
    },[])

    return(
        <>
            {posts?.map(post => (
                    <div className="post">
                        <div className="info">
                            <div className="title">{post?.title}</div>
                            <div className="post-text">{post?.body}</div>
                        </div>
                    </div>
                ))
                }
        </>
    )
}