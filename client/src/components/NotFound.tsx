import notFound from "/notFound.svg";

const NotFound = () => {
  return (
    <div className="flex justify-center flex-col gap-5 items-center mt-[200px]">
      <img src={notFound} alt="not found" />
      <h2 className="text-lg text-AntarcticDeep font-semibold">
        მომხმარებელი არ მოიძებნა
      </h2>
    </div>
  );
};

export default NotFound;
