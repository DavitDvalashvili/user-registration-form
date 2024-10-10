import { DetailViewProps } from "../types/usersType";
import { format } from "date-fns";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const DetailView = ({ targetUser, setShowDetailView }: DetailViewProps) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center ">
      <div className=" border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4 ">
        <div
          key={targetUser.id}
          className=" px-4 max-w-[1370px] xl:mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <div className="flex justify-center items-center md:col-span-2 xl:col-span-1 ">
            <img
              src={targetUser.photo_url}
              alt="avatar"
              className="w-[300px]"
            />
          </div>

          <div className="flex flex-col gap-3 md:col-span-1 mt-12">
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700">სახელი</div>
              <div>{targetUser.first_name || "---"}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700  ">პირადი ნომერი</div>
              <div>{targetUser.personal_id || "---"}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700 ">ელ. ფოსტა</div>
              <div className="">{targetUser.email || "---"}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700 ">ალტ. ელ. ფოსტა</div>
              <div className="">{targetUser.alternative_email || "---"}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700">პოზიციას</div>
              <div className="">{targetUser.position || "---"}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:col-span-1  md:mt-12">
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700">გვარი</div>
              <div className="">{targetUser.last_name || "---"}</div>
            </div>

            <div className="flex justify-start gap-3 items-center">
              <div className="font-semibold text-gray-700">
                დაბადების თარიღი
              </div>
              <div className="">
                {format(new Date(targetUser.date_of_birth), "yyyy-MM-dd") ||
                  "---"}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700">
                მობილურის ნომერი
              </div>
              <div>{targetUser.mobile_number || "---"}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700">
                ალტ. მობილურის ნომერი
              </div>
              <div>{targetUser.alternative_mobile_number || "---"}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-gray-700">სქესი</div>
              <div className="">{targetUser.gender || "---"}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 my-5">
          <div className="text-ChinChinCherry flex gap-3 items-top justify-center cursor-pointer font-semibold">
            <FaMobileAlt className="text-[20px]" />
            <span>ალტ. მეილის წაშლა</span>
          </div>
          <div className="text-ChinChinCherry flex gap-3 items-top justify-center cursor-pointer font-semibold">
            <MdOutlineEmail className="text-[20px]" />{" "}
            <span>ალტ. მობილურის წაშლა</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5">
          <button
            onClick={() => setShowDetailView(false)}
            className="bg-SheetMetal text-white px-4 py-2 text-sm rounded transition-transform duration-200 hover:shadow-lg hover:scale-105"
          >
            დახურვა
          </button>
          <button className="bg-NorthAtlanticBreeze text-white px-4 py-2 text-sm rounded transition-transform duration-200 hover:shadow-lg hover:scale-105">
            რედაქტირება
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
