import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./firebase/config";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, addPost } from "./PostSlice";

const FIRESTORE_COLLECTION = "Parcial2_posts";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsStart());
      try {
        const querySnapshot = await getDocs(collection(db, FIRESTORE_COLLECTION));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchPostsSuccess(postsData));
      } catch (err) {
        dispatch(fetchPostsFailure(err.message));
      }
    };
    fetchPosts();
  }, [dispatch]);

  const handleAddPost = async (e) => {
    e.preventDefault();
    const newPost = { title, content, createdAt: serverTimestamp() };
    try {
      const docRef = await addDoc(collection(db, FIRESTORE_COLLECTION), newPost);
      dispatch(addPost({ id: docRef.id, title, content, createdAt: Date.now() }));
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Error creando post: " + err.message);
    }
  };

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 12 }}>
      <h2>Publicaciones</h2>
      <form onSubmit={handleAddPost}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br/>
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        /><br/>
        <button type="submit">Publicar</button>
      </form>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
