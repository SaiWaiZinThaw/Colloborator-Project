import { useState } from "react";
import Layout from "./Layout";

interface Member {
  id: number;
  name: string;
  percentage: number;
}

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [adminPercentage, setAdminPercentage] = useState(100);
  const [avaliablePercent, setAvaliablePercent] = useState(100);

  const addMember = (percentage: number, name: string) => {
    const newMember = {
      id: Date.now(),
      name,
      percentage,
    };
    setMembers([...members, newMember]);
    setAdminPercentage(adminPercentage - percentage);
    setAvaliablePercent(adminPercentage - percentage); // Update avaliablePercent
  };

  const editMember = (editedPercentage: number, id: number) => {
    setMembers(
      members.map((member: Member) => {
        if (member.id === id) {
          const oldPercentage = member.percentage;
          const newAdminPercentage =
            adminPercentage + oldPercentage - editedPercentage;
          member.percentage = editedPercentage;

          if (newAdminPercentage >= 0) {
            setAdminPercentage(newAdminPercentage);
            setAvaliablePercent(100 - newAdminPercentage);
          } else {
            setAdminPercentage(0);
            setAvaliablePercent(0);
          }
        }
        return member;
      })
    );
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
    members.forEach((member) => {
      if (member.id === id) {
        const oldPercentage = member.percentage;
        setAdminPercentage(adminPercentage + oldPercentage);
        setAvaliablePercent(adminPercentage + oldPercentage); // Update avaliablePercent
      }
    });
  };

  return (
    <Layout
      members={members}
      addMember={addMember}
      adminPercentage={adminPercentage}
      setAdminPercentage={setAdminPercentage}
      avaliablePercent={avaliablePercent}
      setAvaliablePercent={setAvaliablePercent}
      editMember={editMember}
      deleteMember={deleteMember}
    />
  );
}

export default App;
