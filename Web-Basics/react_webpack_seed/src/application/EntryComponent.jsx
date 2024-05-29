import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { MultiSelect } from "primereact/multiselect";

export default function EntryComponent() {
  const { dispatch } = useContext(Context);

  const [value, setValue] = useState();

  useEffect(() => {
    dispatch({ type: "setModalId", payload: "my-modal" });
  }, []);

  return (
    <>
      <h2>MultiSelect</h2>
      <MultiSelect
        value={value}
        onChange={(e) => setValue(e.value)}
        optionGroupLabel="label"
        optionGroupChildren="options"
        optionLabel="label"
        optionValue="value"
        options={[
          {
            label: "Group 1",
            options: [
              { label: "Option 1", value: 1 },
              { label: "Option 2", value: 2 },
              { label: "Option 3", value: 3 },
            ],
          },
          {
            label: "Group 2",
            options: [
              { label: "Option 4", value: 4 },
              { label: "Option 5", value: 5 },
              { label: "Option 6", value: 6 },
            ],
          },
        ]}
      />
    </>
  );
}
