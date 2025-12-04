export default function ActionCard() {
  const items = [
    {
      title: "Project 1",
      description: "Progress",
    },
    {
      title: "Project 2",
      description: "Progress",
    },
  ];

  return (
    <div className=" p-6">
      <div className="flex gap-6 flex-wrap ">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white w-64 p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{item.description}</p>

            <button className="edit px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
