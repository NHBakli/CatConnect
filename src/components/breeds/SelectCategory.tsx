import React from "react";

type Breed = {
  id: string;
  name: string;
};

interface SelectCategoryProps {
  breeds: Breed[];
  onSelect: (id: string) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  breeds,
  onSelect,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className="mb-4 w-full">
      <select
        onChange={handleChange}
        className="bg-custom-gradient w-full p-2 border-none text-white rounded-lg"
      >
        <option value="" className="text-white bg-customBlue">
          Select a breed
        </option>
        {breeds.map((breed) => (
          <option
            className="text-white bg-customBlue"
            key={breed.id}
            value={breed.id}
          >
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
