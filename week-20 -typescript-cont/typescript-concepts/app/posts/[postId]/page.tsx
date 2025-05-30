import axios from "axios";

interface PostProps{
    params:{
        postId:string
    }
}

export default async function Posts({params}:PostProps){

    const postId = (await params).postId;

    const postData = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);


    return <div>
        <h1>This are my posts</h1>
        <h2>Title</h2>
        <div>{postData.data.title}</div>
        <h3>Body</h3>
        <div>{postData.data.body}</div>
    </div>
}