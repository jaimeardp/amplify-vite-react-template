// src/pages/CreateArticlePage.js
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


function createPost(postContent:any) {
  client.models.Todo.create(postContent);
}


const GenPostCompoenent = () => {
  const [content, setContent] = useState('');

  return (
    <div>
      <h1>Create Article</h1>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={(values) => {
          // handle form submission
          console.log(values);
          createPost(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="Article Title" />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <ReactQuill
                value={content}
                onChange={(value) => {
                  setContent(value);
                  setFieldValue('content', value);
                }}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }, { 'direction': 'rtl' }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenPostCompoenent;
