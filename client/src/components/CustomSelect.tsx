import { usePositionStore } from "../store/positionStore";
import { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { user } from "../types/usersType";

type CustomSelectProps = {
  register: UseFormRegister<user>;
};

const CustomSelect = ({ register }: CustomSelectProps) => {
  const { getPositions, positions } = usePositionStore();

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  return (
    <div>
      <select
        {...register("position")}
        defaultValue=""
        className=" w-[200px] lg:w-[250px] h-[26px] focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 cursor-pointer"
      >
        <option value="">აირჩიე პოზიცია</option>
        {positions && positions.length > 0 ? (
          positions.map((position) => (
            <option key={position.id} value={position.name}>
              {position.name}
            </option>
          ))
        ) : (
          <option>Loading positions...</option>
        )}
      </select>
    </div>
  );
};

export default CustomSelect;
