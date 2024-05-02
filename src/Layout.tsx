import { useState } from "react";
import AddMember from "./AddMember";
import Admin from "./Admin";
import MemberLayout from "./MemberLayout";

interface Member {
  id: number;
  name: string;
  percentage: number;
}

const Layout = (props: any) => {
  const [addMemberVisible, setaddMemberVisible] = useState(true);

  return (
    <div className="min-h-screen bg-black w-screen flex flex-col relative ">
      <h1 className="font-bold text-yellow-500 text-4xl p-5">Collabrators</h1>
      <Admin adminPercentage={props.adminPercentage} />
      {props.members.map((member: Member) => (
        <MemberLayout
          id={member.id}
          name={member.name}
          key={member.id}
          percentage={member.percentage}
          editMember={props.editMember}
          updater={props.updater}
          deleteMember={props.deleteMember}
          adminPercentage={props.adminPercentage}
          setAdminPercentage={props.setAdminPercentage}
          setAvaliablePercent={props.setAvaliablePercent}
        />
      ))}

      <button
        onClick={() => {
          setaddMemberVisible(!addMemberVisible);
        }}
        className="self-end mr-10 w-40 h-14 bg-yellow-500 font-bold text-black rounded-sm text-lg active:scale-90 duration-300"
      >
        Add Member
      </button>

      <AddMember
        addMemberVisible={addMemberVisible}
        addMember={props.addMember}
        adminPercentage={props.adminPercentage}
      />
    </div>
  );
};

export default Layout;
