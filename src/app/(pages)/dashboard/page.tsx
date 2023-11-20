import Image from "next/image";

export default function Home() {
  return (
    <div className="rounded bg-gray-50 border border-gray-100 flex items-center flex-col justify-center p-16 shadow-sm">
      <div className="self-start mb-7">
        <h1 className="font-bold text-2xl text-gray-700">
          Welcome to <span className="text-cyan-500">App Management</span>!
        </h1>

        <p className="mt-3 text-gray-600">
          Select a board and start <br /> organizing your tasks!
        </p>
      </div>

      <Image
        src="/no-data.svg"
        alt="No data image"
        width="347"
        height="332"
        className="h-[332px] w-[347px]"
      />
    </div>
  );
}
