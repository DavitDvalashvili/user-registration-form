import CustomSelect from "../components/CustomSelect";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { user } from "../types/usersType";

interface InputWrapperProps {
  errors: FieldErrors<user>;
  register: UseFormRegister<user>;
  showAltEmail: boolean;
  showAltMobile: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPosition: string;
}

const InputWrapper = ({
  errors,
  register,
  showAltEmail,
  showAltMobile,
  handleImageChange,
  selectedPosition,
}: InputWrapperProps) => {
  return (
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
              selectedPosition={selectedPosition}
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
  );
};

export default InputWrapper;
