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
    <div className='container'>
      <h1>{post.title}</h1>
      <br/>
      <div>
        {post.tags.map((tag:string, index:any) => (
          <span key={index} className="badge bg-primary me-1">{tag}</span>
        ))}
      </div>
      <br/>
      <img src={post.file} alt={post.title} />
      <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
      <div>
        {post.tags.map((tag:string, index:any) => (
          <span key={index} className="badge bg-primary me-1">{tag}</span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

    </div>
  );
};

export default PostDetail;