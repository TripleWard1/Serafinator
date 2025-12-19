'use client';
import { useState, useEffect } from 'react';
import { Joke } from '@/lib/types';

export function useJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('serafinator-data');
    if (saved) {
      try {
        setJokes(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados', e);
      }
    }
  }, []);

  const addJoke = (joke: Joke) => {
    const newJokes = [joke, ...jokes];
    setJokes(newJokes);
    localStorage.setItem('serafinator-data', JSON.stringify(newJokes));
  };
  const deleteJoke = (id: string) => {
    const newJokes = jokes.filter((j) => j.id !== id);
    setJokes(newJokes);
    localStorage.setItem('serafinator-data', JSON.stringify(newJokes));
  };
  return { jokes, addJoke, deleteJoke };
}
