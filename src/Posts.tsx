import { useEffect, useState } from "react";

import { generateClient } from "aws-amplify/data";

import type { Schema } from "../amplify/data/resource";

// import { getUrl } from 'aws-amplify/storage';


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



const PostsComponent = () => {
  
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]);

  useEffect( () => {
    client.models.Post.observeQuery().subscribe({
      next: (data) => {
        console.log('Posts:');
        console.log(data.items);

        setPosts([...data.items])
        // setPosts(posts);
      },
    });
    // client.models.Post.list().then((items) => {
    //   console.log('Posts wit list method:');
    //   console.log(items.data);

    //   setPosts([...items.data])

    // } );

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
