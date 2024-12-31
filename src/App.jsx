import { useState, useEffect } from "react";
import "./App.css";

const Snowfall = () => {
  const snowflakes = Array.from({ length: 75 });

  return (
    <div aria-hidden="true" className="snowfall-container">
      {snowflakes.map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [message, setMessage] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);

  const fullGreeting = "Assalomu alaykum, hurmatli ";
  const fullMessage =
    "Sizni kirib kelayotgan 2025-yil bilan chin dildan tabriklaymiz! Yangi yil hayotingizga baxt, omad va muvaffaqiyat olib kelsin. Yaqinlaringiz bilan sog‘-salomat, shod-xurram damlarni o‘tkazishingizni tilab qolamiz. Yangi yil yangi imkoniyatlar, yangi g‘oyalarga boy bo‘lishini istaymiz. Barcha niyatlaringiz amalga oshsin!";

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const nameInput = event.target.elements.name.value.trim();
    setName(nameInput || "Mehmon");
    setIsNameEntered(true);
  };

  useEffect(() => {
    const targetDate = new Date("2025-01-01T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isNameEntered) {
      let currentText = "";
      let i = 0;

      const interval = setInterval(() => {
        if (i < fullGreeting.length) {
          currentText += fullGreeting[i];
          setGreeting(currentText);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isNameEntered]);

  useEffect(() => {
    if (isNameEntered) {
      let currentText = "";
      let i = 0;

      const interval = setInterval(() => {
        if (i < fullMessage.length) {
          currentText += fullMessage[i];
          setMessage(currentText);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isNameEntered]);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-black min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Snowfall />

      {!isNameEntered && (
        <form
          onSubmit={handleNameSubmit}
          className="absolute top-1/2 transform -translate-y-1/2 w-full max-w-xs px-4 py-6 bg-white bg-opacity-50 rounded-md shadow-lg"
        >
          <label htmlFor="name" className="text-xl font-bold mb-4 text-black">
            Ismingizni kiriting:
          </label>
          <input
            type="text"
            id="name"
            className="p-2 w-full rounded border border-gray-300 text-black bg-white"
            placeholder="Ismingiz"
          />
          <button
            type="submit"
            className="ml-4 mt-4 p-2 bg-blue-600 text-white rounded w-full"
          >
            Tasdiqlash
          </button>
        </form>
      )}

      {isNameEntered && (
        <>
          <h1 className="text-4xl font-bold mb-4 animate-pulse">
            Yangi Yilga Qolgan Vaqt
          </h1>
          <div className="flex space-x-4">
            {["Kun", "Soat", "Minut", "Soniya"].map((label, idx) => (
              <div
                key={idx}
                className="text-center transition-transform transform hover:scale-110"
              >
                <div className="text-3xl font-extrabold">
                  {Object.values(timeLeft)[idx] || 0}
                </div>
                <div className="text-sm">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold transition-opacity duration-700 opacity-100">
              {greeting + name}!
            </h2>
            <p className="mt-4 text-lg leading-7 max-w-xl transition-opacity duration-700 opacity-100">
              {message}
            </p>
          </div>

          <footer className="mt-10 text-center">
            <p className="text-sm">Hurmat bilan, Muhammadov Ozodbek</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
