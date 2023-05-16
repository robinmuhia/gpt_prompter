"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

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
  post: post;
  handleEdit: () => void;
  handleDelete: () => void;
}

const Promptcard = ({ post, handleEdit, handleDelete }: props) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/assets/images/robin.jpg"
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              Robin Muhia
            </h3>
            <p className="font-inter text-sm text-gray-500">
              muhiarobinonyancha@gmail.com
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="icon tab"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      {
        //@ts-ignore
        session?.user!.id === post.creator._id && pathName == "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  );
};

export default Promptcard;
