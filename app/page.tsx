'use client';
import { useState } from 'react';
import { useJokes } from '@/hooks/useJokes';
import { Trash2, Share2, Skull, TrendingUp, AlertTriangle } from 'lucide-react';
import Image from 'next/image'; // Importado para resolver o aviso de LCP

export default function Dashboard() {
  const { jokes, addJoke, deleteJoke } = useJokes();

  // Estados para o formulário
  const [text, setText] = useState('');
  const [cringeLevel, setCringeLevel] = useState(5);
  const [category, setCategory] = useState('Linguística');
  const [noOneLaughed, setNoOneLaughed] = useState(false);
  const [outOfBreath, setOutOfBreath] = useState(false);

  // --- LÓGICA DO PONTO 1: ESTATÍSTICAS ---
  const totalCrimes = jokes.length;
  const avgCringe = totalCrimes > 0 
    ? (jokes.reduce((acc, j) => acc + j.cringeLevel, 0) / totalCrimes).toFixed(1) 
    : 0;
  const mortesPorSilencio = jokes.filter(j => j.reaction === 'Silêncio Mortal').length;

  const categorias = ['Linguística', 'Humor Negro', 'Machista', 'Cringe', 'Alfaiate', 'Dacia', 'Bíblica', 'Outra'];

  // --- LÓGICA DO PONTO 4: PARTILHA ---
  const compartilharCrime = (joke: any) => {
    const mensagem = `🚨 *CRIME DE HUMOR DETETADO* 🚨\n\n"${joke.text}"\n\n📌 *Tipo:* ${joke.category}\n😬 *Nível de Cringe:* ${joke.cringeLevel}/10\n💀 *Impacto:* ${joke.reaction}\n\n_Enviado via Serafinator v1.0_`;
    
    navigator.clipboard.writeText(mensagem);
    alert('Crime copiado! Já podes denunciar no WhatsApp.');
  };

  const salvar = () => {
    if (!text) return;
    let impacto = 'Sopro pelo nariz';
    if (outOfBreath) impacto = 'Ficou sem ar';
    if (noOneLaughed) impacto = 'Silêncio Mortal';

    addJoke({
      id: Math.random().toString(36).substr(2, 9),
      text,
      category,
      date: new Date().toISOString(),
      location: 'Escritório',
      audienceSize: 1,
      reaction: impacto,
      cringeLevel: Number(cringeLevel),
      dryMeter: 10,
      tags: [],
      isFavorite: false,
    });
    setText('');
    setCringeLevel(5);
    setNoOneLaughed(false);
    setOutOfBreath(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F1EE] pb-12 text-[#181410] font-sans">
      {/* BANNER - Corrigido para usar componente Image do Next.js */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="border-8 border-[#181410] shadow-[12px_12px_0px_0px_rgba(24,20,16,1)] overflow-hidden relative h-[300px] w-full">
          <Image 
            src="/banner.png" 
            alt="Serafinator" 
            fill
            className="object-cover"
            priority 
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto mt-10 px-4">
        
        {/* --- PAINEL DE ESTATÍSTICAS (PONTO 1) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border-4 border-[#181410] p-4 shadow-[4px_4px_0px_0px_rgba(24,20,16,1)] flex items-center gap-4">
            <AlertTriangle className="text-[#F67611]" size={32} />
            <div>
              <p className="text-xs font-black uppercase">Total de Crimes</p>
              <p className="text-2xl font-black">{totalCrimes}</p>
            </div>
          </div>
          <div className="bg-white border-4 border-[#181410] p-4 shadow-[4px_4px_0px_0px_rgba(24,20,16,1)] flex items-center gap-4">
            <TrendingUp className="text-red-600" size={32} />
            <div>
              <p className="text-xs font-black uppercase">Cringe Médio</p>
              <p className="text-2xl font-black">{avgCringe}/10</p>
            </div>
          </div>
          <div className="bg-white border-4 border-[#181410] p-4 shadow-[4px_4px_0px_0px_rgba(24,20,16,1)] flex items-center gap-4">
            <Skull className="text-black" size={32} />
            <div>
              <p className="text-xs font-black uppercase">Silêncios Mortais</p>
              <p className="text-2xl font-black">{mortesPorSilencio}</p>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white border-8 border-[#181410] p-8 shadow-[12px_12px_0px_0px_rgba(24,20,16,1)] mb-12">
          <h2 className="text-3xl font-black uppercase mb-6 italic">Registar Nova Ocorrência</h2>
          <div className="space-y-6">
            <div>
              {/* ERRO DE ASPAS CORRIGIDO AQUI */}
              <label className="block text-sm font-black uppercase mb-2 text-[#181410]">A &quot;Pérola&quot; do Serafim:</label>
              <textarea
                className="border-4 border-[#181410] p-4 w-full text-xl font-bold bg-[#F3F1EE] focus:outline-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escreve aqui o crime..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black uppercase mb-2 text-[#181410]">Tipo de Seca:</label>
                <select
                  className="border-4 border-[#181410] p-3 w-full font-bold bg-white appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categorias.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-black uppercase mb-2 text-[#181410]">Nível de Cringe: {cringeLevel}/10</label>
                <input
                  type="range" min="0" max="10"
                  className="w-full h-4 bg-[#F3F1EE] border-2 border-[#181410] appearance-none cursor-pointer accent-[#F67611]"
                  value={cringeLevel}
                  onChange={(e) => setCringeLevel(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="breath"
                  className="w-6 h-6 border-4 border-[#181410] checked:bg-[#F67611] appearance-none cursor-pointer"
                  checked={outOfBreath}
                  onChange={(e) => { setOutOfBreath(e.target.checked); if(e.target.checked) setNoOneLaughed(false); }}
                />
                <label htmlFor="breath" className="font-black uppercase italic cursor-pointer">Ficou sem ar ao rir?</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="laugh"
                  className="w-6 h-6 border-4 border-[#181410] checked:bg-red-600 appearance-none cursor-pointer"
                  checked={noOneLaughed}
                  onChange={(e) => { setNoOneLaughed(e.target.checked); if(e.target.checked) setOutOfBreath(false); }}
                />
                <label htmlFor="laugh" className="font-black uppercase italic cursor-pointer text-red-600">Ninguém se riu?</label>
              </div>
            </div>
            <button
              onClick={salvar}
              className="w-full bg-[#F67611] hover:bg-[#C44607] text-white py-4 font-black uppercase text-2xl border-4 border-[#181410] shadow-[6px_6px_0px_0px_rgba(24,20,16,1)] transition-all active:translate-y-1 active:shadow-none"
            >
              ADICIONAR AO PORTEFÓLIO
            </button>
          </div>
        </div>

        {/* LISTAGEM */}
        <div className="space-y-8">
          <h3 className="text-3xl font-black uppercase italic underline decoration-[#F67611] decoration-8 underline-offset-8">Histórico de Crimes:</h3>
          <div className="grid grid-cols-1 gap-8">
            {jokes.map((j) => (
              <div key={j.id} className="group bg-white border-4 border-[#181410] p-6 shadow-[8px_8px_0px_0px_rgba(230,172,91,1)] relative transition-all hover:shadow-[8px_8px_0px_0px_rgba(24,20,16,1)]">
                
                {/* BOTÕES DE ACÇÃO (Esquerda Superior) */}
                <div className="absolute -left-4 -top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => deleteJoke(j.id)}
                    className="p-2 bg-red-600 text-white border-4 border-[#181410] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-800"
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => compartilharCrime(j)}
                    className="p-2 bg-blue-500 text-white border-4 border-[#181410] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700"
                    title="Partilhar Crime"
                  >
                    <Share2 size={20} />
                  </button>
                </div>

                <div className="absolute top-0 right-0 flex border-l-4 border-b-4 border-[#181410]">
                  <div className="bg-[#181410] text-white px-3 py-1 font-black text-xs uppercase italic">{j.category}</div>
                  <div className="bg-[#F67611] text-white px-3 py-1 font-black text-xs uppercase italic">Cringe: {j.cringeLevel}/10</div>
                </div>

                {/* ERRO DE ASPAS CORRIGIDO AQUI TAMBÉM */}
                <p className="text-4xl font-black italic leading-tight mt-4 mb-6 pr-10">&quot;{j.text}&quot;</p>

                <div className="flex justify-between items-center border-t-4 border-[#181410] pt-4 font-bold uppercase text-xs">
                  <span className={j.reaction === 'Silêncio Mortal' ? 'text-red-600 underline decoration-2' : j.reaction === 'Ficou sem ar' ? 'text-green-600' : ''}>
                    Impacto: {j.reaction}
                  </span>
                  <span>{new Date(j.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}