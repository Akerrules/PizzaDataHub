export default function NavBar() {
  return (
    <main className=" scroll-smooth absolute z-10 w-full">
      <div className=" text-black pb-2 pt-10 ">
        <ul className="flex flex-row justify-center space-x-36 text-lg text-gray-800 font-bold ">
          <li className="rounded-xl shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="/">Home</a>
          </li>
          <li className="rounded-lg shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="#data">Data</a>
          </li>
          <li className="rounded-lg shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="#contact-us">Contact</a>
          </li>
          <li className="rounded-lg shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="">About</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
