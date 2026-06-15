import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CardSwap = ({ cards = [] }) => {
  const [cardsList, setCardsList] = useState(cards);

  const swapCard = () => {
    setCardsList((prev) => {
      const newCards = [...prev];
      const topCard = newCards.shift();
      newCards.push(topCard);
      return newCards;
    });
  };

  if (!cardsList || cardsList.length === 0) return null;

  return (
    <div className="relative w-full max-w-md h-[450px] mx-auto cursor-pointer perspective-1000" onClick={swapCard}>
      <AnimatePresence mode="popLayout">
        {cardsList.map((card, index) => {
          const isTop = index === 0;
          return (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.8, opacity: 0, y: 100, rotateX: 20 }}
              animate={{ 
                scale: 1 - index * 0.06, 
                y: index * 25, 
                rotateX: 0,
                zIndex: cardsList.length - index,
                opacity: 1 - index * 0.15
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                y: -100, 
                rotateZ: -10,
                transition: { duration: 0.3 } 
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`absolute top-0 left-0 w-full h-[400px] rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between border border-white/10 backdrop-blur-xl ${card.bgClass || 'bg-slate-800'}`}
              style={{
                transformOrigin: "top center"
              }}
            >
              {/* Card Content */}
              {card.content}
              
              {/* Overlay for inactive cards to darken them */}
              {!isTop && (
                <div className="absolute inset-0 bg-black/20 rounded-[2rem] pointer-events-none transition-opacity duration-300"></div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-slate-500 font-bold tracking-widest uppercase flex items-center gap-2">
        <span className="w-8 h-[1px] bg-slate-600"></span>
        Click to Swap
        <span className="w-8 h-[1px] bg-slate-600"></span>
      </div>
    </div>
  );
};

export default CardSwap;
