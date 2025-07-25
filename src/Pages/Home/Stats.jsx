import CountUp from "react-countup";
import { Fade } from "react-awesome-reveal";

const stats = [
  {
    id: 1,
    label: "Registered Users",
    value: 120000,
    gradient: "from-pink-400 to-purple-500",
    icon: "👥",
  },
  {
    id: 2,
    label: "App Downloads",
    value: 95000,
    gradient: "from-green-400 to-teal-500",
    icon: "📱",
  },
  {
    id: 3,
    label: "Products To Purchase",
    value: 1800,
    gradient: "from-yellow-400 to-orange-500",
    icon: "📦",
  },
  {
    id: 4,
    label: "Daily Active Users",
    value: 25000,
    gradient: "from-blue-400 to-cyan-500",
    icon: "🔥",
  },
];

const Stats = () => {
  return (
    <Fade cascade damping={0.1} duration={1200} triggerOnce>
      <section className="w-full max-w-[1300px] mx-auto px-4 md:px-8 py-14 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-16">
          🛍️ Royal Market Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-xl transform hover:scale-105 transition-all duration-300`}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold">
                <CountUp end={stat.value} duration={30} separator="," />+
              </div>
              <p className="text-base md:text-lg font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Fade>
  );
};

export default Stats;
