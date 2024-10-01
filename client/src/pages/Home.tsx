import { SubmitHandler, useForm } from "react-hook-form";
import { user } from "../type";

const Home = () => {
  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    //control,
    formState: { errors },
    //setValue,
  } = useForm<user>();

  const onSubmit: SubmitHandler<user> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <legend className="text-xl font-bold mb-3">ზოგადი ინფორმაცია</legend>
      <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
        <div className="flex gap-2 items-end">
          <label
            htmlFor="first_name"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            სახელი
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.first_name?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
            htmlFor="last_name"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            გვარი
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.last_name?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
            htmlFor="personal_id"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            პირადი ნომერი
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.personal_id?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
            htmlFor="date_of_birth"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            დაბადების თარიღი
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.date_of_birth?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 cursor-pointer"
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
        <div className="flex gap-2 items-end">
          <label
            htmlFor="email"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            ელ. ფოსტა
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.email?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
        <div className="flex gap-2 items-end">
          <label
            htmlFor="alternative_email"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            ალტერნატიული ელ. ფოსტა
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.alternative_email?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
        <div className="flex gap-2 items-end">
          <label
            htmlFor="mobile_number"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            მობილურის ნომერი
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.mobile_number?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
        <div className="flex gap-2 items-end">
          <label
            htmlFor="alternative_mobile_number"
            className="font-semibold text-SheetMetal w-[150px]"
          >
            ალტერნატიული მობილურის ნომერი
          </label>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-ChinChinCherry h-4">
              {errors.alternative_mobile_number?.message}
            </span>
            <input
              className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
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
      </fieldset>
      <button
        type="submit"
        className="px-4 py-2 bg-green text-white rounded-md cursor-pointer text-[10px] "
      >
        დამატება
      </button>
    </form>
  );
};

export default Home;
