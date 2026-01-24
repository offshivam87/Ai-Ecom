const Topbar = () => {
  return (
    <div className="h-30 bg-white py-5 shadow-sm flex items-center justify-between px-4 md:px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </div>
  );
};

export default Topbar;
