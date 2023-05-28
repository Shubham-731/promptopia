"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    const searchedPost = posts.filter(
      (post) =>
        post.tag.toLowerCase().includes(query) ||
        post.creator.username.includes(query)
    );
    setFilteredPosts(searchedPost);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  useEffect(() => setFilteredPosts(posts), [posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
