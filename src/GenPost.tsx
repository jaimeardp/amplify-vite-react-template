// src/pages/CreateArticlePage.js
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
// import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

import { uploadData } from 'aws-amplify/storage';


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

// const client = generateClient<Schema>();

// Define the Tag interface
interface Tag {
  id: string;
  text: string;
  className: string;
}

// interface FormValues {
//   title: string;
//   content: string;
//   file?: File;
//   tags: Tag[];
// }

// interface LanndingImage {
//   name: string;
//   file: File;
// }


// const createPost = async (postContent: FormValues) => {
//   try {
//     console.log(postContent);
//     // const res = await client.models.Post.create(postContent);
//     // console.log(res);
//   } catch (error) {
//     console.error('Error creating post:', error);
//   }
// };


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
        onSubmit={ async (values) => {
          // handle form submission
          console.log(values);
          console.log(tags);

          const result = await uploadData({
            path: "1.jpg",
            // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
            data: fileImage? fileImage : new File([""], "filename"),
          }).result;

          console.log('Succeeded: ', result);

          values.tags = tags;
            
          // createPost(values);
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
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
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