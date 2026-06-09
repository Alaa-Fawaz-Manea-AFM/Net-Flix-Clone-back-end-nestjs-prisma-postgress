const TitleBorder = ({ title }: { title: string }) => (
  <div className="w-fit items-start group mb-10 cursor-pointer">
    <h1 className="font-semibold text-3xl text-zinc-900 dark:text-white transition-colors duration-200 group-hover:text-custom-red">
      {title}
    </h1>

    <div className="bg-custom-red w-1/2 h-1 rounded-full group-hover:w-full duration-300 ease-out mt-1.5 shadow-[0_4px_12px_rgba(239,68,68,0.5)] dark:shadow-[0_4px_20px_rgba(239,68,68,0.8)]" />
  </div>
);

export default TitleBorder;
