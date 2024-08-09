import { useEffect, useState } from "react";

import { generateClient } from "aws-amplify/data";

import type { Schema } from "../amplify/data/resource";

import { getUrl } from 'aws-amplify/storage';


const client = generateClient<Schema>();

// function generateFilename(title: string, tags: string[]): string {
//   // Convert the title to a base64-encoded string
//   const base64Title = Buffer.from(title).toString('base64');
  
//   // Use a short version of the base64 string (e.g., take the first 10 characters)
//   const shortBase64Title = base64Title.slice(0, 10);
  
//   // Concatenate the short base64 title with the tags
//   const tagsString = tags.join('_');
  
//   // Return the new filename
//   return `profile_${shortBase64Title}_${tagsString}.jpg`;
// }

const getUrlForPost = async (keyImage: string) => {

  try {
    const linkToStorageFile = await getUrl({
      path: `${keyImage}`, // the path to the image in storage
      // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
      options: {
        validateObjectExistence: false,  // defaults to false
        expiresIn: 3600 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
      },
    });
    console.log('signed URL: ', linkToStorageFile.url);
    console.log('URL expires at: ', linkToStorageFile.expiresAt); 

    return linkToStorageFile.url.toString();

  } catch (error) {
    console.log('Error : ', error);
  }

};



const PostsComponent = () => {
  
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]);

  useEffect( () => {
    // client.models.Post.observeQuery().subscribe({
    //   next: (data) => {
    //     console.log('Posts:');
    //     console.log(data.items);

    //     setPosts([...data.items])
    //     // setPosts(posts);
    //   },
    // });
    // client.models.Post.list().then((items) => {
    //   console.log('Posts wit list method:');
    //   console.log(items.data);

    //   setPosts([...items.data])

    // } );
    
  const fetchPosts = async () => {
    try {
      const posts = await client.models.Post.list();
      console.log('Posts:');
      console.log(posts.data);
      const postsAdded = await Promise.all(posts.data.map( async (post) => {
        const imageUrl = await getUrlForPost(post.file);
        post.file = imageUrl? imageUrl : post.file;
        console.log('Post:');
        console.log(post);
        return post;
      }));
      console.log('Posts New!:');
      console.log(postsAdded);
      // setPosts([...posts.data]);
      setPosts([...postsAdded]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  fetchPosts();

  }, []);


  return (

    <main>
      <h1>Posts</h1>
      <div className= "row mb-2">

        {posts.map((post: any) => (
          <div className="card mb-4 m-4" style={{ width: '18rem' }}>
            <img src={post.file} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
              <div className="mt-3">
                {post.tags && post.tags.map((tag:string, index:any) => (
                  <span key={index} className="badge bg-primary me-1">{tag}</span>
                ))}
              </div>
              <div className="mt-2 text-muted">
                <small>Created at: {new Date(post.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
          ))}

      </div>


    </main>
  );
}

export default PostsComponent;
