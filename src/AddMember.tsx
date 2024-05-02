import InputMask from "react-input-mask";
import "animate.css";
import { useState } from "react";

const AddMember = (props: any) => {
  const createMember = () => {
    props.addMember(newPercentage, newName);
    setNewName("");
    setnewPercentage("");
  };
  const [newPercentage, setnewPercentage] = useState("");
  const [newName, setNewName] = useState("");

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const percentageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if (inputValue === "") {
      setnewPercentage("");
      return;
    }
    inputValue = parseInt(inputValue).toString();

    if (inputValue === "") {
      inputValue = "0";
    } else if (parseInt(inputValue) > props.adminPercentage) {
      inputValue = props.adminPercentage;
    }

    setnewPercentage(inputValue.toString());
  };

  return (
    <div
      id="popup"
      className={`${
        !props.addMemberVisible
          ? "animate__animated animate__bounceIn m-auto top-0 bottom-0 right-0 left-0 absolute flex flex-col bg-yellow-500 rounded-lg text-black w-[400px] h-[380px] p-10 gap-5"
          : "hidden"
      }`}
    >
      <label htmlFor="name" className="font-bold text-3xl">
        Collabrator Name
      </label>
      <input
        id="name"
        required
        value={newName}
        onChange={nameHandler}
        type="text"
        className="p-2 bg-white font-semibold text-3xl rounded-md"
      />
      <label htmlFor="percentage" className="font-bold text-3xl">
        Percentage
      </label>
      <InputMask
        mask="999"
        required
        value={newPercentage}
        onChange={percentageHandler}
        maskChar=""
        maskPlaceholder=""
        id="percentage"
        type="text"
        className="p-2 bg-white font-semibold text-3xl rounded-md"
      />
      <div className="flex gap-3 self-center">
        <button
          onClick={createMember}
          className="bg-black w-32 h-14 text-white font-bold text-lg  rounded-md"
        >
          Add
        </button>
        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const popup = (event.target as HTMLElement).closest("#popup");
            if (popup) {
              popup.classList.add("hidden");
            }
          }}
          className="bg-black w-32 h-14 text-white font-bold text-lg  rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMember;
