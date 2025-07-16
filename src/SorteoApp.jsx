import { useState, useRef } from "react";
import { Button } from "./components/ui/button";

const nombres = ["Esteban", "Javier", "Alexis", "Matias"];

export default function SorteoApp() {
  const [resaltado, setResaltado] = useState(null);
  const [ganador, setGanador] = useState(null);
  const [sorteando, setSorteando] = useState(false);

  const fartLoopRef = useRef(null);
  const fartFinalRef = useRef(null);

  const iniciarSorteo = () => {
    setGanador(null);
    setSorteando(true);
    fartLoopRef.current?.play();

    let contador = 0;
    const maximo = 20;

    const intervalo = setInterval(() => {
      const indice = Math.floor(Math.random() * nombres.length);
      setResaltado(nombres[indice]);
      contador++;

      if (contador >= maximo) {
        clearInterval(intervalo);
        fartLoopRef.current?.pause();
        fartLoopRef.current.currentTime = 0;
        fartFinalRef.current?.play();
        setGanador(nombres[indice]);
        setSorteando(false);
      }
    }, 150);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Sorteo</h1>
      <div className="space-y-4 mb-6">
        {nombres.map((nombre) => (
          <div
            key={nombre}
            className={`p-2 rounded-xl border text-lg transition-all duration-200 ${
              resaltado === nombre
                ? "bg-yellow-300 font-bold scale-105"
                : "bg-white"
            } ${ganador === nombre ? "bg-green-400 text-white" : ""}`}
          >
            {nombre}
          </div>
        ))}
      </div>
      <Button onClick={iniciarSorteo} disabled={sorteando}>
        {sorteando ? "Sorteando..." : "Iniciar Sorteo"}
      </Button>
      {ganador && (
        <div className="mt-6 text-xl font-semibold text-green-700">
          🎉 Ganador: {ganador} 🎉
        </div>
      )}
      <audio ref={fartLoopRef} src="/sounds/fart-loop.mp3" preload="auto" />
      <audio ref={fartFinalRef} src="/sounds/fart-final.mp3" preload="auto" />
    </div>
  );
}
