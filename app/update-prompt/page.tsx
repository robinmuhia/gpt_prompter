"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const editPrompt = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt Id not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      //@ts-ignore
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
