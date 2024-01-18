export default function NavBar() {
  return (
    <main className="  absolute z-10 w-full">
      <div className=" text-black pb-2 pt-10 ">
        <ul className="flex flex-row justify-center space-x-36 text-lg text-gray-800 font-bold ">
          <li className="rounded-xl shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="default.asp">Home</a>
          </li>
          <li className="rounded-lg shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="news.asp">News</a>
          </li>
          <li className="rounded-lg shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="contact.asp">Contact</a>
          </li>
          <li className="rounded-lg shadow-lg bg-white p-2 pl-4 pr-4">
            <a href="about.asp">About</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
