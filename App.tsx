import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

interface Card {
  suit: string;
  value: string;
  color: string;
}

function App() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [remainingCards, setRemainingCards] = useState<number>(52);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const initializeDeck = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck: Card[] = [];

    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({
          suit,
          value,
          color: suit === '♥' || suit === '♦' ? 'text-red-600' : 'text-gray-900'
        });
      });
    });

    return shuffleDeck(newDeck);
  };

  const shuffleDeck = (cards: Card[]) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const drawCard = () => {
    if (deck.length === 0) return;
    
    const newDeck = [...deck];
    const drawnCard = newDeck.pop();
    setDeck(newDeck);
    setCurrentCard(drawnCard || null);
    setRemainingCards(newDeck.length);
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setCurrentCard(null);
    const shuffled = initializeDeck();
    setDeck(shuffled);
    setRemainingCards(52);
    setTimeout(() => setIsShuffling(false), 500);
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Card Draw</h1>
          <p className="text-green-200">Remaining cards: {remainingCards}</p>
        </div>

        <div className="flex justify-center">
          <div className={`bg-white rounded-xl shadow-2xl w-64 h-96 flex items-center justify-center transform transition-transform duration-300 ${currentCard ? 'scale-100' : 'scale-95'}`}>
            {currentCard ? (
              <div className={`text-center ${currentCard.color}`}>
                <div className="text-6xl font-bold mb-4">{currentCard.value}</div>
                <div className="text-8xl">{currentCard.suit}</div>
              </div>
            ) : (
              <div className="bg-blue-800 rounded-lg w-48 h-72 flex items-center justify-center">
                <div className="text-white text-4xl">🎴</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={drawCard}
            disabled={remainingCards === 0}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all transform hover:scale-105
              ${remainingCards > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Draw Card
          </button>
          
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold flex items-center space-x-2 transition-all transform hover:scale-105 hover:bg-green-700"
          >
            <Shuffle className="w-5 h-5" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;