import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { deletePost } from "../../../hooks/hooks";
import Post from "../../../interfaces/Posts";

interface ModalDeleteProps {
  isOpenModalDelete: boolean;
  onCloseModalDelete: () => void;
  id: number;
  posts: Post[];
  setPosts: (arg: Post[]) => void;
}

function ModalDelete({
  isOpenModalDelete,
  onCloseModalDelete,
  posts,
  setPosts,
  id,
}: ModalDeleteProps) {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    />
  );

  const removePost = async (postId: number) => {
    try {
      await deletePost(postId);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      onCloseModalDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const overlay = <OverlayTwo />;

  return (
    <>
      <Modal isCentered isOpen={isOpenModalDelete} onClose={onCloseModalDelete}>
        {overlay}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="font-[700] text-[22px]">
              Are you sure you want to delete this item?
            </h1>
            <div className="flex justify-end w-full gap-3 mt-5">
              <button
                className="bg-[#FFFF] border border-black text-black rounded-[8px] py-1 w-[120px] font-[700] hover:scale-110 transition-all duration-200"
                onClick={onCloseModalDelete}
              >
                Cancel
              </button>
              <button
                className="bg-[#FF5151] rounded-[8px] py-1 w-[120px] font-[700] text-white hover:scale-110 transition-all duration-200"
                type="submit"
                onClick={() => removePost(id)}
              >
                Delete
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDelete;
