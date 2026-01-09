import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PsychologistLandingUpmini from './components/PsychologistLandingUpmini'
import ClientLanding from './components/ClientLanding'

const PALETTE = {
  bg: "#0B0E12",
  panel: "rgba(255,255,255,0.06)",
  panel2: "rgba(255,255,255,0.08)",
  stroke: "rgba(255,255,255,0.12)",
  text: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.62)",
  blueLight: "#60A5FA",
  blueGlow: "rgba(59, 130, 246, 0.3)",
  blueGlowLight: "rgba(59, 130, 246, 0.15)",
};

function Loader() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: PALETTE.bg }}
    >
      {/* Background blur blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-70"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${PALETTE.blueGlowLight}, transparent 55%)`,
          }}
        />
        <div
          className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${PALETTE.blueGlow}, transparent 55%)`,
          }}
        />
      </div>

      {/* Loader card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: `linear-gradient(180deg, ${PALETTE.panel2}, ${PALETTE.panel})`,
          borderColor: PALETTE.stroke,
          boxShadow: `0 28px 90px rgba(0,0,0,0.45)`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding: "3rem 4rem",
        }}
      >
        {/* Subtle sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
        
        <div className="relative flex flex-col items-center gap-6">
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 rounded-3xl border-2"
            style={{
              borderColor: PALETTE.blueLight,
              borderTopColor: "transparent",
              borderRightColor: "transparent",
            }}
          />
          
          {/* Text */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold"
              style={{ color: PALETTE.text }}
            >
              Upmini.app
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-sm"
              style={{ color: PALETTE.muted }}
            >
              Загрузка...
            </motion.div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: PALETTE.blueLight }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки страницы
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 секунды загрузки

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Предотвращаем горизонтальную прокрутку
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.maxWidth = '100vw';
    
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
      document.body.style.width = '';
      document.documentElement.style.width = '';
      document.body.style.maxWidth = '';
      document.documentElement.style.maxWidth = '';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}
          >
            <PsychologistLandingUpmini />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App

