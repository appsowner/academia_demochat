import  { useState, useEffect } from 'react';
import logo from './logo_t.png';
import { Send } from 'lucide-react';

const sampleResponse = `La Inteligencia Artificial optimiza procesos, automatiza tareas y mejora la toma de decisiones, ayudando a las empresas a reducir costos 
y aumentar la eficiencia. Las soluciones basadas en IA permiten enfocar recursos en la innovación, generando un impacto directo en la rentabilidad`;

function App() {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const resetAnimation = () => {
    setDisplayedText('');
    setCharIndex(0);
  };

  useEffect(() => {
    const restartInterval = setInterval(() => {
      resetAnimation();
    }, 40000);

    return () => clearInterval(restartInterval);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (charIndex < sampleResponse.length) {
      timer = setTimeout(() => {
        setDisplayedText(prev => prev + sampleResponse[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 30);
    }
    return () => clearTimeout(timer);
  }, [charIndex]);

  const progress = (charIndex / sampleResponse.length) * 100;

  return (

    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8 relative z-10">
        <div className="max-w-1xl text-center mx-auto">
          {/* Logo más pequeño y con menor margen */}
          <div className="mb-4">
            <img src={logo} alt="Logo" className="w-32 sm:w-40 md:w-40 mx-auto" />
          </div>

          {/* Título más cercano al logo */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            <span className="text-black">Academia de IA </span>
            <span className="text-[#032B66]">para innovar e impulsar</span><br />
            <span className="text-[#FFA500]">tu negocio.</span>
          </div>

 
        </div>
      <div className="container mx-auto px-1 py-0.5 md:py-1 max-w-3xl flex-1 mt-0">

        <div className="bg-white rounded-lg p-2 md:p-4 shadow-xl min-h-[200px] border border-[#0A2647]/10"> {/* Reducir padding */}
  <div className="flex flex-col h-full gap-3">
    <div className="flex-1">
      <div className="h-[6em] overflow-y-auto font-light"> {/* Limitar altura a 6 líneas */}
        <p className="text-[#0A2647] text-sm sm:text-base whitespace-pre-line">
          {displayedText}
          {charIndex < sampleResponse.length && (
            <span className="inline-block w-2 h-4 bg-[#0A2647] animate-pulse ml-1">|</span>
          )}
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-[#0A2647] h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
              <div className="flex justify-end mb-2"> {/* Reducir margen inferior */}
                <button
                  className="h-10 px-4 bg-[#0A2647] text-white rounded-lg hover:bg-[#205295] transition-colors flex items-center gap-2"
                  onClick={() => { }}
                >
                  <Send size={18} />
                  <span>Enviar</span>
                </button>
              </div>
    </div>
  </div>

        </div>
      </div>

      <footer className="text-center py-4 text-[#0A2647] text-sm sm:text-base">
        <p>&copy; AppsOwner 2022. Todos los derechos reservados.</p>
      </footer>
    </div>

  )
}

export default App;
