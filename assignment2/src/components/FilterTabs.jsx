import React from "react";

function FilterTabs({ filterOptions, selectedFilter, onSelectFilter }) {
  return (
    <div className="mt-2 flex gap-1.5 rounded-xl bg-[#f1eef8] p-[5px]">
      {filterOptions.map((filterOption) => {
        const isSelected = selectedFilter === filterOption.value;

        return (
          <button
            key={filterOption.value}
            type="button"
            onClick={() => onSelectFilter(filterOption.value)}
            className={`flex-1 rounded-[9px] px-2 py-2 text-[13px] font-bold ${
              isSelected
                ? "bg-[#672be0] text-white"
                : "bg-transparent text-[#777] hover:bg-white"
            }`}
          >
            {filterOption.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
