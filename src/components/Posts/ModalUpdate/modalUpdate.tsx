import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { updatePost } from "../../../hooks/hooks";
import Post from "../../../interfaces/Posts";

interface ModalUpdateProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  posts: Post[];
  setPosts: (arg: Post[]) => void;
  content: string;
}

function ModalUpdate({
  isOpen,
  onClose,
  posts,
  setPosts,
  title,
  content,
  id,
}: ModalUpdateProps) {
  const [titleModal, setTitleModal] = useState<string>("");
  const [contentModal, setContentModal] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayTwo />);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleModal(event.target.value);
    setTitleError("");
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentModal(event.target.value);
    setContentError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleModal.trim() === "") {
      setTitleError("Please write a title.");
      return;
    }

    if (contentModal.trim() === "") {
      setContentError("Please write a comment.");
      return;
    }
    console.log("title", titleModal, "content", contentModal);
    if (titleModal.trim() !== "" && contentModal.trim() !== "") {
      await updatePost(id as number, {
        title: titleModal,
        content: contentModal,
      });
      updatePostArray(id as number, {
        title: titleModal,
        content: contentModal,
      });

      onClose();
      setTitleError("");
      setContentError("");
    }
  };

  const updatePostArray = (
    postId: number,
    updatedPost: { title: string; content: string }
  ): void => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, ...updatedPost };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  useEffect(() => {
    setTitleError("");
    setContentError("");
  }, [isOpen]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="w-full border border-gray-300 border-opacity-75 rounded-[9px] py-2 px-4"
                  id="title"
                  defaultValue={title}
                  type="text"
                  onChange={handleTitleChange}
                  placeholder="Hello world"
                />
                {titleError && (
                  <p className="text-red-500 text-xs italic">{titleError}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  className="w-full border border-gray-300 border-opacity-75 rounded-[9px] py-2 px-4"
                  defaultValue={content}
                  id="content"
                  onChange={handleContentChange}
                  placeholder="Content here"
                />
                {contentError && (
                  <p className="text-red-500 text-xs italic">{contentError}</p>
                )}
              </div>
              <div className="flex justify-end w-full gap-3 mt-5">
                <button
                  className="bg-[#FFFF] border border-black text-black rounded-[8px] py-1 w-[120px] font-[700] hover:scale-110 transition-all duration-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#47B960] rounded-[8px] py-1 w-[120px] font-[700] text-white hover:scale-110 transition-all duration-200"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUpdate;
