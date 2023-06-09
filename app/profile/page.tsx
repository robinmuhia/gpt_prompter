"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "components/Profile";

interface post {
  _id: string;
  prompt: string;
  tag: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      if (
        session?.user?.email === "muhiarobinonyancha@gmail.com" ||
        session?.user?.email === "alpha01ashley@gmail.com"
      ) {
        const response = await fetch(
          `/api/users/6460ede34b545c53edb075c6/posts`
        );
        const data = await response.json();
        setPosts(data);
      } else {
        //@ts-ignore
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);
  const handleEdit = (post: post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p: post) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="Past"
      desc="Welcome to your past affirmations"
      data={posts}
      //@ts-ignore
      handleEdit={handleEdit}
      //@ts-ignore
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
