"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "components/Form";
import { getAffirmation } from "utils/gpt";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState({
    prompt: "",
    user: "",
  });
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    try {
      //@ts-ignore
      const currentUser = session.user;
      if (currentUser) {
        if (
          currentUser?.email === "muhiarobinonyancha@gmail.com" ||
          currentUser?.email === "alpha01ashley@gmail.com" ||
          currentUser?.email === "robinonyancha123@gmail.com" ||
          currentUser?.email === "naomimuhia250@gmail.com"
        ) {
          setVerified(true);
          //@ts-ignore
          setPost({ ...post, user: currentUser?.email });
        }
      }
    } catch (error) {
      setVerified(false);
    }
  }, []);

  const createPrompt = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const gptResponse = await getAffirmation(post.prompt, post.user);
      if (
        post.user === "muhiarobinonyancha@gmail.com" ||
        post.user === "alpha01ashley@gmail.com"
      ) {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: gptResponse,
            //@ts-ignore
            userId: "6460ede34b545c53edb075c6",
          }),
        });
        if (response.ok) {
          router.push("/");
        }
      } else {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: gptResponse,
            //@ts-ignore
            userId: session?.user.id,
          }),
        });
        if (response.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {verified ? (
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          user={post.user}
          submitting={submitting}
          //@ts-ignore
          handleSubmit={createPrompt}
        />
      ) : (
        <h1>
          404 - You are not authorized to generate prompts. Contact
          muhiarobinonyancha@gmail.com if you wish to be added!!
        </h1>
      )}
    </>
  );
};

export default CreatePrompt;
