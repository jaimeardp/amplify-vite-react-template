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
            <div className="ql-snow col-md-6" key={post.id}>
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">World</strong>
                  <h3 className="mb-0"> {post.title} </h3>
                  <div className="mb-1 text-muted"> {post.createdAt} </div>
                  <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" className="stretched-link">Continue reading</a>
                </div>
                <div className="col-auto d-none d-lg-block">
                  {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                  <img src={ post.file } alt="..." />
                </div>
              </div>
            </div>
          ))}

      </div>


    </main>
  );
}

export default PostsComponent;
