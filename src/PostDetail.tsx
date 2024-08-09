import React from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const PostDetail: React.FC = () => {
    //   const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { post } = location.state as { post: any };

    console.log('Post Detail:');

    console.log(post);

    console.log('Tags:');

    console.log(post.tags);

    return (
        <div className='container text-center'>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{post.title}</h1>

            <div className="mb-3">
                {post.tags.map((tag: string, index: any) => (
                    <span key={index} className="badge bg-primary me-1">{tag}</span>
                ))}
            </div>

            <img
                src={post.file}
                alt={post.title}
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', marginBottom: '1rem' }}
            />

            <p className="text-muted" style={{ marginBottom: '2rem' }}>
                Created at: {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <div className="mb-3">
                {post.tags.map((tag: string, index: any) => (
                    <span key={index} className="badge bg-primary me-1">{tag}</span>
                ))}
            </div>

            <div
                className="mx-auto"
                style={{ maxWidth: '800px', textAlign: 'left' }}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>

    );
};

export default PostDetail;