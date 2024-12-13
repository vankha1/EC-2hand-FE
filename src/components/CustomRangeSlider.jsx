import React, { useState } from "react";
import { Range } from "react-range";
import { Radio } from "@material-tailwind/react";

const CustomRangeSlider = ({ value }) => {
  const [values, setValues] = useState([2000000, 10000000]); // Default range

  const STEP = 1000000;
  const MIN = 0;
  const MAX = 20000000;

  const priceRangesData = [
    "Tất cả",
    "Dưới 1,000,000",
    "1,000,000 tới 2,000,000",
    "2,000,000 tới 5,000,000",
    "5,000,000 tới 10,000,000",
    "10,000,000 tới 20,000,000",
    "20,000,000 trở lên",
  ];

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-4">TẦM GIÁ</h3>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 bg-gray-300 rounded-full relative"
            style={{
              ...props.style,
            }}
          >
            <div
              className="absolute h-2 bg-orange rounded-full"
              style={{
                left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                right: `${100 - ((values[1] - MIN) / (MAX - MIN)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className={`h-4 w-4 bg-orange rounded-full ${
              isDragged && "shadow-lg"
            }`}
          />
        )}
      />
      <div className="flex justify-between text-sm mt-4">
        <span>{values[0].toLocaleString()} VND</span>
        <span>{values[1].toLocaleString()} VND</span>
      </div>

      <div className="flex flex-col mt-4 space-y-2">
        {priceRangesData.map((range, index) => (
          <Radio
            key={index}
            name="price"
            label={range}
            defaultChecked={range === "5,000,000 tới 10,000,000"} // Default check this range
          />
        ))}
      </div>
    </div>
  );
};

export default CustomRangeSlider;
