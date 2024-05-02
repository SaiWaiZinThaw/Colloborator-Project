import React, { useState } from "react";
import InputMask from "react-input-mask";

const MemberLayout = (props: any) => {
  const [percentage, setPercentage] = useState(props.percentage);
  const [input, setInput] = useState(false);

  const inputHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    let inputValue = event.currentTarget.value;
    if (inputValue === "") {
      inputValue = "0";
    }

    const newInputValue = parseInt(inputValue);
    const oldPercentage = props.percentage;
    const totalPercentage =
      parseInt(props.adminPercentage) + parseInt(oldPercentage);

    const clampedPercentage = Math.min(
      Math.max(newInputValue, 0),
      totalPercentage
    );
    setPercentage(clampedPercentage);

    if (event.key === "Enter") {
      setInput(false);
      const editedPercentage = clampedPercentage;
      const remainingPercentage = totalPercentage - editedPercentage;
      props.editMember(editedPercentage, props.id);
      props.setAdminPercentage(
        remainingPercentage >= 0 ? remainingPercentage : 0
      );
      props.setAvaliablePercent(
        remainingPercentage >= 0 ? remainingPercentage : 0
      );
    }
  };

  const deleteHandler = () => {
    props.deleteMember(props.id);
  };

  return (
    <div className="contributor py-10 px-24 text-yellow-500 w-full flex border border-white mb-5">
      <span className="w-5/12 font-bold text-3xl">{props.name}</span>
      <div className="w-5/12">
        {!input ? (
          <span
            onClick={() => {
              setInput(true);
            }}
            className="text-3xl font-semibold"
          >
            {percentage}%
          </span>
        ) : (
          <InputMask
            value={percentage}
            onChange={(event) => setPercentage(parseInt(event.target.value))}
            onKeyUp={inputHandler}
            mask="999"
            maskChar=""
            maskPlaceholder=""
            className="text-3xl font-semibold border-white border p-2 w-24 rounded-md"
          />
        )}
      </div>

      <button
        onClick={deleteHandler}
        className="w-2/12 font-bold text-2xl hover:text-white"
      >
        Remove
      </button>
    </div>
  );
};

export default MemberLayout;
