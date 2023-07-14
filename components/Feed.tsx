"use client";

import { useState, useEffect } from "react";
import Promptcard from "./Promptcard";
import { useSession } from "next-auth/react";

interface creator {
  image: string;
  username: string;
  email: string;
  _id: string;
}

interface post {
  _id: string;
  prompt: string;
  creator: creator;
}
interface props {
  data: Array<post>;
}

const PromptcardList = ({ data }: props) => {
  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.reverse().map((post: post) => (
          //@ts-ignore
          <Promptcard key={post._id} post={post} />
        ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    //@ts-ignore
    const id = session?.user.id;
    if (id) {
      if (
        session?.user?.email === process.env.NEXT_PUBLIC_ROBIN_EMAIL ||
        session?.user?.email === process.env.NEXT_PUBLIC_AYIRA_EMAIL
      ) {
        const response = await fetch(
          `/api/users/6460ede34b545c53edb075c6/posts`
        );
        const data = await response.json();
        setAllPosts(data);
      } else {
        const response = await fetch(`/api/users/${id}/posts`);
        const data = await response.json();
        setAllPosts(data);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter((item: post) => regex.test(item.prompt));
  };

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    //@ts-ignore
    clearTimeout(searchTimeout);
    //@ts-ignore
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      //@ts-ignore
      setTimeout(() => {
        //@ts-ignore
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a previous affirmation..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptcardList data={searchedResults} />
      ) : (
        <PromptcardList data={allPosts} />
      )}
    </section>
  );
};

export default Feed;
