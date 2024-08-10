// src/pages/CreateArticlePage.js
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
// import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { uploadData,  } from 'aws-amplify/storage';

// import { graphqlOperation } from '@aws-amplify/api-graphql';
// const FontAttributor = ReactQuill.Quill.import('attributors/class/font');
// FontAttributor.whitelist = [
//   'sofia',
//   'slabo',
//   'roboto',
//   'inconsolata',
//   'ubuntu',
// ];
// ReactQuill.Quill.register(FontAttributor, true);

// const Font = ReactQuill.Quill.import('formats/font');
// Font.whitelist = ['Roboto', 'Sans-Serif', 'Serif', 'Monospace', 'Open Sans'];
// ReactQuill.Quill.register(Font, true);

// const Font = ReactQuill.Quill.import('formats/font');
// console.log(Font);
// Font.whitelist = ['Ubuntu', 'raleway', 'Roboto', 'oswald', 'Merriweather', 'Serif', 'Sans-Serif', 'Monospace'];
// ReactQuill.Quill.register(Font, true);

// const Quill = ReactQuill.Quill;

// const FontAttributor = Quill.import('formats/font');
// console.log(FontAttributor);
// FontAttributor.whitelist = [
//   'Roboto',
//   'Sans-Serif',
//   'monospace',
//   'serif',
// ];
// Quill.register(FontAttributor, true);

// console.log(Quill.toString());

// const uploadAvatar = async (postContent: FormValues) => {
//   try {
//     const result = await uploadData({
//       path: "album/2024/1.jpg",
//       // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
//       data: file?.file,
//       options: {
//         onProgress // Optional progress callback.
//       }
//     }).result;
//     console.log('Succeeded: ', result);
//   } catch (error) {
//     console.log('Error : ', error);
//   }
// };



import TagInputComponent from "./TagInputComponent";

const client = generateClient<Schema>();

// Define the Tag interface
interface Tag {
  id: string;
  text: string;
  className: string;
}

interface PostType {
  title: string;
  content: string;
  file: string;
  tags: string[];
}

// interface LanndingImage {
//   name: string;
//   file: File;
// }

// const getUrlForPost = async (keyImage: string) => {

//   try {
//     const linkToStorageFile = await getUrl({
//       path: `profile/${keyImage}`, // the path to the image in storage
//       // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
//       options: {
//         validateObjectExistence: false,  // defaults to false
//         expiresIn: 20 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
//       },
//     });
//     console.log('signed URL: ', linkToStorageFile.url);
//     console.log('URL expires at: ', linkToStorageFile.expiresAt); 

//     return linkToStorageFile.url.toString();

//   } catch (error) {
//     console.log('Error : ', error);
//   }

// };


const createPost = async (postContent: PostType) => {
  try {
    console.log('Creating post...');
    console.log(postContent);
    // const imageUrl = await getUrlForPost(postContent.file);
    // postContent.file = imageUrl? imageUrl : postContent.file;
    const res = await client.models.Post.create(postContent);
    console.log(res);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

function toBase64(str: string): string {
  if (typeof window !== 'undefined' && window.btoa) {
    return window.btoa(str);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  } else {
    throw new Error('No method available to encode to base64');
  }
}

function generateFilename(title: string, tags: string[]): string {
  // Convert the title to a base64-encoded string
  const base64Title = toBase64(title);  
  // Use a short version of the base64 string (e.g., take the first 10 characters)
  const shortBase64Title = base64Title.slice(0, 10);
  
  // Concatenate the short base64 title with the tags
  const tagsString = tags.join('_');
  
  // Return the new filename
  return `profile_${shortBase64Title}_${tagsString}`;
}
function getTagNames(tags: Tag[]): string[] {
  // Map over the tags array and extract the name property
  return tags.map(tag => tag.text);
}

const GenPostCompoenent = () => {
  const [content, setContent] = useState('');

  const [fileImage, setFile] = useState<File>();

  // Use the Tag interface for the tags state
  const [tags, setTags] = useState<Tag[]>([]);

  const handleDelete = (i: number) => {
      setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
      setTags([...tags, tag]);
  };

  const handleClearAll = () => {
      setTags([]);
  };


  // Upload

  // const handleChange = (event: any) => {
  //   setFile(event.target.files[0]);
  // };


  return (
    <div className="row">
      <h1>Create Article</h1>
      <Formik
        initialValues={{ title: '', content: '', tags: [] as Tag[] }}
        onSubmit={ async (values: any) => {
          // handle form submission
          console.log(values);
          console.log(tags);

          const keyFileName =  `profile/${generateFilename(values.title, getTagNames(tags))}.jpg`

          const result = await uploadData({
            path: keyFileName,
            // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
            data: fileImage? fileImage : new File([""], "filename"),
          }).result;

          console.log('Succeeded: ', result);

          values.tags = tags.map(tag => tag.text);

          values.file = result.path;
            
          await createPost(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field id="title" name="title" placeholder="Article Title" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Image Thumbail</label>
              <input id="file" name="file" type="file" className="form-control" onChange={(event) => {
                if (event.currentTarget.files) {
                  setFieldValue("file", event.currentTarget.files[0]);
                  setFile(event.currentTarget.files[0]);
                }
              }} />
            </div>

            <div className="mb-3">
              <label htmlFor="content">Content</label>
              <ReactQuill
                value={content}
                theme="snow"
                onChange={(value) => {
                  setContent(value);
                  setFieldValue('content', value);
                }}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': []}],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Tags</label>
              <TagInputComponent
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                onClearAll={handleClearAll}
              />
            </div>
            <div className="mb-3">
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary center">Create Post</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenPostCompoenent;