"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Form from "@/components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`);

        if (res.ok) {
          const data = await res.json();
          setPost(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (promptId) getPostDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {post && (
        <Form
          type="Update"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      )}
    </>
  );
};

export default UpdatePrompt;
