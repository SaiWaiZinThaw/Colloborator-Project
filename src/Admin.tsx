const Admin = (props: any) => {
  return (
    <>
      <div className=" py-10 px-24 text-yellow-500 w-full flex items-center border border-white mb-5">
        <span className="w-5/12 font-bold text-3xl">Admin</span>
        <span className="w-5/12 text-3xl">{props.adminPercentage}%</span>
        <button className="w-2/12 cursor-default font-bold opacity-60 text-2xl ">
          Remove
        </button>
      </div>
    </>
  );
};

export default Admin;
