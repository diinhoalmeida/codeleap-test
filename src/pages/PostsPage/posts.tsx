import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { createPost, deletePost, getPosts } from "../../hooks/hooks";
import formatTimeDifference from "../../utils/dateDifference";
import { FaTrashAlt } from "react-icons/fa";
import ModalUpdate from "../../components/Posts/ModalUpdate/modalUpdate";
import { useDisclosure } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import Post from "../../interfaces/Posts";

const PostsPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [titleModal, setTitleModal] = useState<string>("");
  const [contentModal, setContentModal] = useState<string>("");
  const [idPost, setIdPost] = useState<number>();
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError("");
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setContentError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === "") {
      setTitleError("Please write a title.");
    }

    if (content.trim() === "") {
      setContentError("Please write a comment.");
    }

    if (title.trim() !== "" && content.trim() !== "") {
      await savePost({ username, title, content });

      setTitle("");
      setContent("");
      setTitleError("");
      setContentError("");
    }
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const fetchData = async () => {
    try {
      const postsData = await getPosts(10, offset);
      if (offset !== 0) {
        setPosts((prevPosts) => [...prevPosts, ...postsData.results]);
      } else {
        setPosts(postsData.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const savePost = async (data: {
    username: string;
    title: string;
    content: string;
  }) => {
    try {
      const newPost = await createPost(data);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const removePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const setInfosToModal = (
    idSelected: number,
    titleSelected: string,
    contentSelected: string
  ) => {
    setIdPost(idSelected);
    setContentModal(contentSelected);
    setTitleModal(titleSelected);
    onOpen();
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername.slice(1, storedUsername.length));
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [offset]);

  return (
    <div className="h-screen w-screen p-0 m-0 flex justify-center">
      <div className="w-[800px]">
        <div className="h-[80px] w-full bg-[#7695EC] p-5">
          <h1 className="text-[22px] text-white font-[700]">
            CodeLeap Network
          </h1>
        </div>
        <div className="bg-white w-full p-5 ">
          <div className="w-full p-3 border shadow-md rounded-[16px] bg-white mb-4">
            <h2 className="text-[22px] font-[700]">What's on your mind?</h2>
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
                  value={title}
                  type="text"
                  onChange={handleTitleChange}
                  placeholder="Hello world"
                />
                {titleError && (
                  <p className="text-red-500 text-xs italic">{titleError}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  className="w-full border border-gray-300 border-opacity-75 rounded-[9px] py-2 px-4"
                  value={content}
                  id="content"
                  onChange={handleContentChange}
                  placeholder="Content here"
                />
                {contentError && (
                  <p className="text-red-500 text-xs italic">{contentError}</p>
                )}
              </div>
              <div className="flex justify-end w-full">
                <button
                  className="bg-[#7695EC] rounded-[8px] py-1 px-6 font-[700] text-white hover:scale-110 transition-all duration-200"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          <div className="w-full p-3 border shadow-md rounded-[16px] bg-white flex flex-col gap-5">
            {posts.map((post, index) => (
              <div className="w-full rounded-[8px] bg-white shadow-md">
                <div
                  key={index}
                  className="h-[70px] rounded-t-[8px] w-full bg-[#7695EC] px-5 items-center flex"
                >
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-[22px] font-[700] text-white">
                      {post.title}
                    </h1>
                    {username === post.username && (
                      <div className="flex cursor-pointer gap-5">
                        <div
                          onClick={() =>
                            setInfosToModal(
                              post.id as number,
                              post.title,
                              post.content
                            )
                          }
                        >
                          <FaRegEdit className="text-white w-[20px]" />
                        </div>
                        <div onClick={() => removePost(post.id as number)}>
                          <FaTrashAlt className="text-white w-[20px]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full p-3 flex flex-col gap-3 ">
                  <div className="flex font-[700] row w-full justify-between text-[#777777] text-[18px]">
                    <p>@{post.username}</p>
                    <p>{formatTimeDifference(post.created_datetime as Date)}</p>
                  </div>
                  <p>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full mt-3">
            <button
              className="bg-[#7695EC] w-full rounded-[8px] py-3 px-6 font-[700] text-white hover:scale-[1.01] transition-all duration-200"
              onClick={() => loadMore()}
            >
              LOAD MORE
            </button>
          </div>
        </div>
      </div>
      <ModalUpdate
        isOpen={isOpen}
        id={idPost as number}
        posts={posts}
        setPosts={setPosts}
        onClose={onClose}
        title={titleModal}
        content={contentModal}
      />
    </div>
  );
};

export default PostsPage;
