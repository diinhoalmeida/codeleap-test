import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().replace(/[^A-Za-z0-9]/g, "");

    setUsername(value);
  };

  const handleEnter = () => {
    if (username !== "") {
      localStorage.setItem("username", `@${username}`);
      navigate("/posts");
    }
  };

  return (
    <div className="h-screen w-screen p-0 m-0 flex items-center justify-center">
      <div className="w-full sm:w-[500px] bg-white rounded-[16px] p-4 sm:p-8 flex flex-col justify-between border border-gray-300 border-opacity-75 gap-3">
        <h1 className="text-black text-[20px] font-[700]">
          Welcome to CodeLeap network!
        </h1>
        <div>
          <h2>Please enter your username</h2>
          <input
            type="text"
            placeholder="John..."
            className="w-full border border-gray-300 border-opacity-75 rounded-[9px] py-2 px-4"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            className="bg-[#7695EC] rounded-[8px] py-1 px-6 font-[700] text-white hover:scale-110 transition-all duration-200"
            onClick={handleEnter}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
