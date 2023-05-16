"use client";

import { useState, useEffect } from "react";
import Promptcard from "./Promptcard";

interface creator {
  image: string;
  username: string;
  email: string;
  _id: string;
}

interface post {
  _id: string;
  prompt: string;
  tag: string;
  creator: creator;
}
interface props {
  data: Array<post>;
}

const PromptCardList = ({ data }: props) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: post) => (
        //@ts-ignore
        <Promptcard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full next-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
