import { useState } from "react";

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setValue(e.target.checked);
    } else {
      setValue(e.target.value);
    }
  };

  return { value, onChange };
};
