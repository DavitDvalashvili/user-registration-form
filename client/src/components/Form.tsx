import { SubmitHandler, useForm } from "react-hook-form";
import { user } from "../types/usersType";
import CustomSelect from "../components/CustomSelect";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { useUploadStore } from "../store/upload";
import { useUserStore } from "../store/userStore";

const Form = () => {
  const [showAltMobile, setShowAltMobile] = useState<boolean>(false);
  const [showAltEmail, setShowAlEmail] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

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
    <form
      className="border border-gray-300 rounded-lg p-10 bg-white shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-end">
            <label
              htmlFor="first_name"
              className="font-semibold text-SheetMetal w-[200px]  text-start "
            >
              სახელი
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.first_name?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px]  "
                type="text"
                {...register("first_name", {
                  required: "სავალდებულო ველი",
                  maxLength: {
                    value: 10,
                    message: "სახელი უნდა იყოს მაქსიმუმ 10 სიმბოლო",
                  },
                  minLength: {
                    value: 2,
                    message: "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <label
              htmlFor="personal_id"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              პირადი ნომერი
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.personal_id?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px]  "
                type="text"
                {...register("personal_id", {
                  required: "სავალდებულო ველი",
                  maxLength: {
                    value: 11,
                    message: "პირადი ნომერი უნდა იყოს 11 სუმბოლო",
                  },
                  minLength: {
                    value: 11,
                    message: "პირადი ნომერი უნდა იყოს 11 სუმბოლო",
                  },
                  pattern: {
                    value: /^(0[1-9]|[1-5][0-9]|6[0-2])[0-9]{9}$/,
                    message: "პირადი ნომრის ფორმატი არასწორია",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <label
              htmlFor="email"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              ელ. ფოსტა
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.email?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px] "
                type="text"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "ელ.ფოსტის ფორმატი არასწორია",
                  },
                })}
              />
            </div>
          </div>
          {showAltEmail && (
            <div className="flex gap-2 items-center mt-5">
              <label
                htmlFor="alternative_email"
                className="font-semibold text-SheetMetal w-[200px]  text-start"
              >
                ალტერნატიული ელ. ფოსტა
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-ChinChinCherry h-4">
                  {errors.alternative_email?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px] "
                  type="text"
                  {...register("alternative_email", {
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "ელ.ფოსტის ფორმატი არასწორია",
                    },
                  })}
                />
              </div>
            </div>
          )}
          <div className="flex gap-2 items-end">
            <label
              htmlFor="position"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              პოზიცია
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.position?.message}
              </span>
              <CustomSelect
                register={register}
                selectedPosition="აირჩიე პოზიცია"
              />
            </div>
          </div>
          <div className="flex gap-2 items-end w-[458px]">
            <p className="font-semibold text-SheetMetal w-[200px]  text-start">
              სქესი
            </p>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.gender?.message}
              </span>
              <div className="flex items-center gap-5">
                <label htmlFor="male" className="cursor-pointer">
                  <input
                    type="radio"
                    id="male"
                    value="კაცი"
                    className="mr-4 "
                    {...register("gender")}
                  />
                  კაცი
                </label>
                <label htmlFor="female" className="cursor-pointer">
                  <input
                    type="radio"
                    id="female"
                    value="ქალი"
                    className="mr-4 "
                    {...register("gender")}
                  />
                  ქალი
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-end">
            <label
              htmlFor="last_name"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              გვარი
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.last_name?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px] "
                type="text"
                {...register("last_name", {
                  required: "სავალდებულო ველი",
                  maxLength: {
                    value: 15,
                    message: "გვარი უნდა იყოს მაქსიმუმ 15 სიმბოლო",
                  },
                  minLength: {
                    value: 4,
                    message: "გვარი უნდა იყოს მინიმუმ 4 სიმბოლო",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <label
              htmlFor="date_of_birth"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              დაბადების თარიღი
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.date_of_birth?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 cursor-pointer h-[26px] w-[200px]  lg:w-[250px] "
                type="date"
                {...register("date_of_birth", {
                  required: "სავალდებულო ველი",
                  validate: {
                    isBeforeToday: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const eighteenYearsAgo = new Date(
                        today.getFullYear() - 18,
                        today.getMonth(),
                        today.getDate()
                      );
                      return (
                        selectedDate < eighteenYearsAgo ||
                        "მინიმალური ასაკი უნდა იყოს 18 წელი"
                      );
                    },
                  },
                })}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end ">
            <label
              htmlFor="mobile_number"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              მობილურის ნომერი
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.mobile_number?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px] "
                type="text"
                {...register("mobile_number", {
                  pattern: {
                    value:
                      /^(511|514|551|555|557|558|559|568|570|571|574|577|579|591|592|593|595|596|597|598|599)\d{6}$/,
                    message: "მობილურის ნომრის ფორმატი არასწორია",
                  },
                })}
              />
            </div>
          </div>
          {showAltMobile && (
            <div className="flex gap-2 items-end mt-5">
              <label
                htmlFor="alternative_mobile_number"
                className="font-semibold text-SheetMetal w-[200px]  text-start"
              >
                ალტერნატიული მობილურის ნომერი
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-ChinChinCherry h-4">
                  {errors.alternative_mobile_number?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px] "
                  type="text"
                  {...register("alternative_mobile_number", {
                    pattern: {
                      value:
                        /^(511|514|551|555|557|558|559|568|570|571|574|577|579|591|592|593|595|596|597|598|599)\d{6}$/,
                      message: "მობილურის ნომრის ფორმატი არასწორია",
                    },
                  })}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 items-end">
            <label
              htmlFor="photo_url"
              className="font-semibold text-SheetMetal w-[200px]  text-start"
            >
              ფოტო
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-ChinChinCherry h-4">
                {errors.photo_url?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 w-[200px]  lg:w-[250px] "
                type="file"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </fieldset>

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
            {showAltMobile ? "ალტ. მობილურის წაშლა" : "ალტ. მობილურის დამატება"}
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
  );
};

export default Form;
