import { usePositionStore } from "../store/positionStore";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { user } from "../types/usersType";

type CustomSelectProps = {
  register: UseFormRegister<user>;
  selectedPosition: string;
};

const CustomSelect = ({ register, selectedPosition }: CustomSelectProps) => {
  const [position, setPosition] = useState<string>(selectedPosition || ""); // Initialize with selectedPosition
  const { getPositions, positions } = usePositionStore();

  // Fetch positions on component mount
  useEffect(() => {
    getPositions();
  }, [getPositions]);

  // Update local state when the selectedPosition prop changes
  useEffect(() => {
    setPosition(selectedPosition);
  }, [selectedPosition]);

  // Handle change in select element
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value); // Update state when user selects a position
  };

  return (
    <div>
      <select
        {...register("position")}
        value={position}
        onChange={handleChange}
        className="w-[200px] lg:w-[250px] h-[26px] focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 cursor-pointer"
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
