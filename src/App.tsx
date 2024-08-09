// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// // import { Authenticator } from '@aws-amplify/ui-react';

import GenPostCompoenent from "./GenPost";
import HeaderComponent from "./HeaderComponent";
import NavigationComponent from "./NavigationComponent";
import PostDetail from "./PostDetail";
import PostsComponent from "./Posts";

// const client = generateClient<Schema>();
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  return (

    <div className="container">
      {/* <h1>My todos V2</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div> */}
      {/* <HeaderComponent title="My Blog"/>
      <NavigationComponent title="My Blog"/>
      <section className="row">
        <GenPostCompoenent/>
      </section>
      <section className="row">
        <PostsComponent/>
      </section> */}

      <Router>
        <HeaderComponent title="My Blog"/>
        <NavigationComponent title="My Blog"/>
        <Routes>
          <Route path="/" element={<PostsComponent />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/create" element={<GenPostCompoenent />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
