import {useState} from 'react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

async function fetchPosts(): Promise<Post[]> {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
}

async function fetchPostById(newPostId: number): Promise<Post> {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${newPostId}`);
    return response.data;
}

async function createPost(newPost: Omit<Post, 'id'>): Promise<Post> {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    return response.data;
}

function App() {
    const queryClient = useQueryClient();
    const [newPost, setNewPost] = useState({title: '', body: ''});

    const {data: posts, isLoading, error} = useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    const mutation = useMutation<Post, Error, Omit<Post, 'id'>>({
        mutationFn: createPost,
        onSuccess: (data) => {
            const newPostId = data.id;

            queryClient.setQueryData(['posts'], (oldData: Post[] = []) => {
                return [...oldData, {...data, userId: 1}]
            })
            queryClient.setQueryData(['post', newPostId], data);

            queryClient.invalidateQueries({queryKey: ['posts']});
        },
        onError: (err) => {
            console.log("Error fetching Posts from query", err);
        }
    });

    const newPostId = mutation.data?.id;
    const {data: createdPost, isLoading: isPostLoading} = useQuery<Post, Error>({
        queryKey: ['post', mutation.data?.id],
        queryFn: () => fetchPostById(mutation.data!.id),
        enabled: !!newPostId,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newPost.title || !newPost.body) return;
        mutation.mutate({title: newPost.title, body: newPost.body, userId: 1});
        setNewPost({title: '', body: ''});
    };

    return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <h1>Posts</h1>

            {/* Form to create a new post */}
            <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        style={{width: '100%', padding: '8px', margin: '8px 0'}}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={newPost.body}
                        onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                        style={{width: '100%', padding: '8px', margin: '8px 0'}}
                    />
                </div>
                <button
                    type="submit"
                    disabled={mutation.isPending || !newPost.title || !newPost.body}
                    style={{padding: '8px 16px'}}
                >
                    {mutation.isPending ? 'Creating...' : 'Create Post'}
                </button>
            </form>

            {/* Error from mutation */}
            {mutation.isError && (
                <p style={{color: 'red'}}>
                    Error creating post: {mutation.error.message}
                </p>
            )}

            {/* Newly created post */}
            {mutation.isSuccess && createdPost && (
                <div style={{marginBottom: '20px', border: '1px solid #ccc', padding: '10px'}}>
                    <h3>New Post Created (ID: {createdPost.id})</h3>
                    <p><strong>Title:</strong> {createdPost.title}</p>
                    <p><strong>Body:</strong> {createdPost.body}</p>
                    {isPostLoading && <p>Loading post details...</p>}
                </div>
            )}

            {/* List of posts */}
            <h2>All Posts</h2>
            {isLoading ? (
                <p>Loading posts...</p>
            ) : error ? (
                <p style={{color: 'red'}}>Error loading posts: {error.message}</p>
            ) : (
                <ul style={{listStyle: 'none', padding: 0}}>
                    {posts?.slice(0, 5).map((post) => (
                        <li
                            key={post.id}
                            style={{
                                border: '1px solid #ddd',
                                padding: '10px',
                                margin: '5px 0',
                            }}
                        >
                            <strong>{post.title}</strong>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* TanStack Query DevTools */}
            <ReactQueryDevtools initialIsOpen={false}/>
        </div>
    )


}

export default App
