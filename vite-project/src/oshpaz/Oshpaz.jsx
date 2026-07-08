import React from 'react'
import './oshpaz.css'

export default function Oshpaz({ buyurtmalar, qabulQilish, tayorQilish }) {
  return (
    <div className="oshpaz">
      <h1 className="sarlavha">Oshpaz Paneli</h1>

      <div className="kartalar">
        {buyurtmalar.map((item) => (
          <div className="karta" key={item.id}>
            <h2>{item.items?.join(', ') || item.taom}</h2>

            <p>Stol: {item.table || item.stol}</p>
            <p>Tayyorlanish vaqti: 15 min</p>

            <p>
              Holati:
              <span
                className={
                  item.status === 'Tayyor'
                    ? 'yashil'
                    : item.status === 'Yetkazilgan'
                    ? 'kok'
                    : 'sariq'
                }
              >
                {item.status}
              </span>
            </p>

            {item.status === 'Yangi' && (
              <button onClick={() => qabulQilish(item.id)}>
                Qabul qilish
              </button>
            )}

            {item.status === 'Tayyor' && (
              <button onClick={() => tayorQilish(item.id)}>
                Yetkazildi
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
