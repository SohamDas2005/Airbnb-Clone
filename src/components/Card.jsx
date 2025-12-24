export default function Card({ title, price, rating, isDark }) {
  return (
    <div className="min-w-65">
      <div className="relative">
        <img
          src="/images/room.jpg"
          alt={title}
          className="w-full h-65 object-cover rounded-2xl"
        />

        <span
          className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium ${
            isDark ? "bg-zinc-800 text-white" : "bg-white text-black"
          }`}
        >
          Guest favourite
        </span>

        <span className="absolute top-3 right-3 text-white text-xl cursor-pointer">
          <i className="fa-regular fa-heart"></i>
        </span>
      </div>

      <h3 className="mt-2 font-medium">{title}</h3>
      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
        ₹{price} for 2 nights
      </p>
      <p><i class="fa-solid fa-star"></i> {rating}</p>
    </div>
  );
}
