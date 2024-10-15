import { SubmitHandler, useForm } from "react-hook-form";
import { user } from "../types/usersType";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { useUploadStore } from "../store/upload";
import { useUserStore } from "../store/userStore";
import InputWrapper from "./../components/InputWrapper";

const Home = () => {
  const [showAltMobile, setShowAltMobile] = useState<boolean>(false);
  const [showAltEmail, setShowAlEmail] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("../../public/user.png");
  const { uploadImage } = useUploadStore();
  const { addUsers } = useUserStore();

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<user>();

  const onSubmit: SubmitHandler<user> = async (data) => {
    await addUsers({ ...data, photo_url: url });
    reset();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

      // Check the file size before attempting to upload
      if (file.size > MAX_FILE_SIZE) {
        setError("photo_url", {
          type: "manual",
          message: "ფოტო უნდა იყოს 3 მეგაბაიტზე ნაკლები",
        });
        return;
      }
      const response = await uploadImage(file);
      setUrl(response);
    }
  };
  return (
    <div className="p-10 text-center max-w-[1440px] mx-auto ">
      <h1 className="text-xl mb-10">მომზმარებლის რეგისტრაციის ფორმა</h1>
      <form
        className="border border-gray-300 rounded-lg p-10 bg-white shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWrapper
          errors={errors}
          register={register}
          showAltEmail={showAltEmail}
          showAltMobile={showAltMobile}
          handleImageChange={handleImageChange}
          selectedPosition="აირჩიე პოზიცია"
        />

        <div className="flex gap-4 my-5">
          <div
            className={`${
              showAltEmail ? "text-ChinChinCherry" : "text-green"
            } flex gap-3 items-top justify-center cursor-pointer font-semibold`}
            onClick={() => {
              setShowAlEmail(!showAltEmail);
            }}
          >
            <MdOutlineEmail className="text-[20px]" />
            <span>
              {showAltEmail ? "ალტ. მეილის წაშლა" : "ალტ. მეილის დამატება"}
            </span>
          </div>
          <div
            className={`${
              showAltMobile ? "text-ChinChinCherry" : "text-green"
            } flex gap-3 items-top justify-center cursor-pointer font-semibold`}
            onClick={() => {
              setShowAltMobile(!showAltMobile);
            }}
          >
            <FaMobileAlt className="text-[20px]" />
            <span>
              {showAltMobile
                ? "ალტ. მობილურის წაშლა"
                : "ალტ. მობილურის დამატება"}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green text-white rounded-md cursor-pointer text-[12px] transition-transform duration-200 hover:shadow-xl "
        >
          მომხმარებლის დამატება
        </button>
      </form>
    </div>
  );
};

export default Home;
