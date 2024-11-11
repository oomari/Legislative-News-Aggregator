import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col p-8 ">
        <div className="flex justify-around">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 border rounded-sm p-2"
          />
          <button className="bg-blue-500 text-white p-2 rounded-sm w-1/6">
            Filter
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-10 text-white">
          <div className="border border-gray-300 p-12">
            <h2>Article 1</h2>
            <p>Article 1 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 2</h2>
            <p>Article 2 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 3</h2>
            <p>Article 3 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 4</h2>
            <p>Article 4 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 5</h2>
            <p>Article 5 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 6</h2>
            <p>Article 6 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 7</h2>
            <p>Article 7 description</p>
          </div>
          <div className="border border-gray-300 p-12">
            <h2>Article 8</h2>
            <p>Article 8 description</p>
          </div>
        </div>
      </div>
    </main>
  );
}
