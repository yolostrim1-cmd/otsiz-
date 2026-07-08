import React from 'react'
import "./afissant.css";
import { useState } from "react";

function Afitsant({ buyurtmalar, setBuyurtmalar }) {
  const [taom, setTaom] = useState("");
  const [stol, setStol] = useState("");
  const [yangiTaom, setYangiTaom] = useState("");
  const [taomlar, setTaomlar] = useState([
    "Osh",
    "Lagmon",
    "Manti",
    "Somsa",
    "Shashlik",
    "Mastava",
  ]);

  const getTime = () => new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })

  const qoshish = () => {
    if (!taom || !stol) return;

    const yangi = {
      id: Date.now(),
      table: stol,
      customer: 'Mijoz',
      total: 120000,
      status: 'Yangi',
      items: [taom],
      time: getTime(),
    };

    setBuyurtmalar([...buyurtmalar, yangi]);

    setTaom("");
    setStol("");
  };

  const taomQoshish = () => {
    if (!yangiTaom) return;
    setTaomlar([...taomlar, yangiTaom]);
    setYangiTaom("");
  };

  return (
    <div className="sahifa">
      <h1 className="sarlavha">
Afitsant Paneli
      </h1>

      <div className="forma">
        <select
          value={taom}
          onChange={(e) => setTaom(e.target.value)}
        >
          <option value="">Taomni tanlang</option>
          {taomlar.map((t, index) => (
            <option key={index} value={t}>{t}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Stol raqami"
          value={stol}
          onChange={(e) => setStol(e.target.value)}
        />

        <button onClick={qoshish}>
Buyurtma yuborish
        </button>
      </div>

      <div className="taom-qoshish">
        <input
          type="text"
          placeholder="Yangi taom nomi"
          value={yangiTaom}
          onChange={(e) => setYangiTaom(e.target.value)}
        />
        <button onClick={taomQoshish}>
          Taom qo'shish
        </button>
      </div>

      <div className="kartalar">
        {buyurtmalar.map((item) => (
          <div className="karta" key={item.id}>
            <h2>{item.items?.join(', ') || item.taom}</h2>

            <p>Stol: {item.table || item.stol}</p>
            <p>Tayyorlanish vaqti: 15 min</p>

            <p>
              Status:
              <span
                className={
                  item.status === 'Tayyor'
                    ? 'kok'
                    : item.status === 'Yetkazilgan'
                    ? 'yashil'
                    : 'sariq'
                }
              >
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Afitsant;