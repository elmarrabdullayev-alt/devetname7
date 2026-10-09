import React from 'react';

export interface DressCodeColor {
  name: string;
  hex: string;
  border?: string;
}

export interface Invitation7DressCodeProps {
  title?: string;
  note?: string;
  colors?: DressCodeColor[];
}

export const Invitation7DressCode: React.FC<Invitation7DressCodeProps> = ({
  title = 'Geyim Tərzi',
  note = 'Mərasimimizin rəng harmoniyasını tamamlamaq üçün tünd qırmızı, qızılı və krem tonlarında geyimlərə üstünlük verməyiniz xahiş olunur.',
  colors = [
    { name: 'Tünd Bordo', hex: '#5A0712' },
    { name: 'Qızılı Qırmızı', hex: '#7A1623' },
    { name: 'Şampan Qızılı', hex: '#C9A56A' },
    { name: 'Fil Dişi / Krem', hex: '#F7EEE8', border: 'rgba(201,165,106,0.5)' },
    { name: 'Dərin Qara', hex: '#170104' },
  ],
}) => {
  return (
    <section className="content-zone-section relative w-full py-10 px-6 flex flex-col items-center text-center border-b border-[rgba(201,165,106,0.15)] bg-transparent">
      <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#C9A56A] mb-1 font-medium">
        DRESS CODE
      </p>

      <h3 className="font-cormorant text-2xl sm:text-3xl text-[#F7EEE8] font-normal gold-gradient-text mb-4">
        {title}
      </h3>

      {/* Rəng dairələri */}
      <div className="flex items-center justify-center gap-3.5 my-2 flex-wrap">
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5 group">
            <div
              className="w-9 h-9 rounded-full shadow-[0_3px_10px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110 flex items-center justify-center relative"
              style={{
                backgroundColor: color.hex,
                border: color.border ? `2px solid ${color.border}` : '1.5px solid rgba(201, 165, 106, 0.4)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A56A]/40" />
            </div>
            <span className="font-montserrat text-[10px] text-[#F7EEE8]/70 tracking-tight">
              {color.name}
            </span>
          </div>
        ))}
      </div>

      {/* Qısa bir qeyd */}
      <p className="font-cormorant text-base text-[#F7EEE8]/85 max-w-xs mt-4 leading-relaxed italic">
        "{note}"
      </p>
    </section>
  );
};
