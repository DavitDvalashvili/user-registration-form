import { DeleteAdditional } from "../types/usersType";
import { useUserStore } from "../store/userStore";

const DeleteAdditionalInfo = ({
  deleteTarget,
  setDeleteAdditionalInfo,
  setShowDetailView,
  user,
}: DeleteAdditional) => {
  const { deleteAlternativeContact } = useUserStore();

  // Delete component and navigate to components page
  const handleDelete = async () => {
    await deleteAlternativeContact({ id: user.id, type: deleteTarget });
    setDeleteAdditionalInfo(false);
    setShowDetailView(false);
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-6">
      <div className=" border border-gray-300 rounded-lg bg-white shadow-md mb-4 p-10">
        <div className="flex justify-start items-center gap-2 flex-col">
          <p className="font-semibold">ნამდვილად გსურთ წაშალოთ</p>
          <p className=" text-NorthAtlanticBreeze">{deleteTarget}</p>
        </div>
        <div className="flex justify-center items-center gap-4 pt-5">
          <button
            onClick={() => setDeleteAdditionalInfo(false)}
            className="px-4 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm"
          >
            არა
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-ChinChinCherry text-white rounded-md cursor-pointer text-sm"
          >
            დიახ
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteAdditionalInfo;
