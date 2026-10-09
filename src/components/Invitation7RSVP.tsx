import React, { useState } from 'react';

export interface RSVPFormData {
  fullName: string;
  status: 'attending' | 'not_attending';
  guestCount: number;
}

export interface Invitation7RSVPProps {
  title?: string;
  subtitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  statusLabel?: string;
  attendingText?: string;
  notAttendingText?: string;
  guestsLabel?: string;
  submitButtonText?: string;
  successMessage?: string;
  onSubmit?: (data: RSVPFormData) => void;
}

export const Invitation7RSVP: React.FC<Invitation7RSVPProps> = ({
  title = 'Lütfən İştirakınızı Təsdiqləyin',
  subtitle = 'Mərasimimizdə iştirak edib-etməyəcəyinizi əvvəlcədən bildirməyiniz bizim üçün çox önəmlidir.',
  nameLabel = 'Ad və Soyad',
  namePlaceholder = 'Məs: Nərgiz Əliyeva',
  statusLabel = 'İştirak Statusu',
  attendingText = 'İştirak edirəm',
  notAttendingText = 'İştirak edə bilməyəcəyəm',
  guestsLabel = 'Qonaq Sayı',
  submitButtonText = 'Təsdiqlə',
  successMessage = 'Təşəkkür edirik! Cavabınız qeydə alındı.',
  onSubmit,
}) => {
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (onSubmit) {
      onSubmit({ fullName, status, guestCount });
    }
    setIsSubmitted(true);
  };

  return (
    <section className="relative w-full py-10 px-6 flex flex-col items-center text-center border-b border-[rgba(201,165,106,0.2)] bg-transparent">
      <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#C9A56A] mb-1 font-medium">
        RSVP
      </p>

      <h3 className="font-cormorant text-2xl sm:text-3xl text-[#F7EEE8] font-normal gold-gradient-text mb-2 max-w-xs">
        {title}
      </h3>

      <p className="font-montserrat text-xs text-[#F7EEE8]/70 mb-6 max-w-xs leading-relaxed">
        {subtitle}
      </p>

      <div className="w-full max-w-sm p-2 sm:p-4 relative">
        {/* Subtle decorative inner corner */}
        <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#C9A56A]/40" />
        <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#C9A56A]/40" />

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border border-[#C9A56A] flex items-center justify-center text-[#C9A56A] mb-3 bg-[#5A0712]/50">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h4 className="font-cormorant text-2xl text-[#F7EEE8] gold-gradient-text mb-2">
              {successMessage}
            </h4>
            <p className="font-montserrat text-xs text-[#F7EEE8]/70 mb-4">
              {status === 'attending'
                ? `${fullName}, ${guestCount} nəfər olaraq sizi salamlamağı səbirsizliklə gözləyirik!`
                : `${fullName}, xeyirxah arzularınız üçün təşəkkür edirik.`}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-[#C9A56A] underline underline-offset-4 hover:text-[#F7EEE8] transition-colors"
            >
              Məlumatı yenilə
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            {/* Ad-Soyad */}
            <div>
              <label className="block font-montserrat text-xs uppercase tracking-wider text-[#C9A56A] mb-1.5">
                {nameLabel}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#170104]/80 border border-[#C9A56A]/30 text-[#F7EEE8] text-sm focus:outline-none focus:border-[#C9A56A] placeholder:text-[#F7EEE8]/30 transition-colors"
              />
            </div>

            {/* İştirak Statusu */}
            <div>
              <label className="block font-montserrat text-xs uppercase tracking-wider text-[#C9A56A] mb-1.5">
                {statusLabel}
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('attending')}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-montserrat flex items-center justify-between border transition-all text-left ${
                    status === 'attending'
                      ? 'border-[#C9A56A] bg-[#7A1623]/60 text-[#F7EEE8] shadow-sm'
                      : 'border-[#C9A56A]/20 bg-[#170104]/50 text-[#F7EEE8]/70 hover:border-[#C9A56A]/40'
                  }`}
                >
                  <span>{attendingText}</span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      status === 'attending'
                        ? 'border-[#C9A56A] bg-[#C9A56A]'
                        : 'border-[#C9A56A]/40'
                    }`}
                  >
                    {status === 'attending' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#170104]" />
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('not_attending')}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-montserrat flex items-center justify-between border transition-all text-left ${
                    status === 'not_attending'
                      ? 'border-[#C9A56A] bg-[#7A1623]/60 text-[#F7EEE8] shadow-sm'
                      : 'border-[#C9A56A]/20 bg-[#170104]/50 text-[#F7EEE8]/70 hover:border-[#C9A56A]/40'
                  }`}
                >
                  <span>{notAttendingText}</span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      status === 'not_attending'
                        ? 'border-[#C9A56A] bg-[#C9A56A]'
                        : 'border-[#C9A56A]/40'
                    }`}
                  >
                    {status === 'not_attending' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#170104]" />
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Qonaq Sayı (yalnız iştirak edərsə) */}
            {status === 'attending' && (
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-wider text-[#C9A56A] mb-1.5">
                  {guestsLabel}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuestCount(count)}
                      className={`flex-1 py-2 rounded-lg text-xs font-montserrat border transition-all ${
                        guestCount === count
                          ? 'border-[#C9A56A] bg-[#7A1623] text-[#F7EEE8] font-semibold'
                          : 'border-[#C9A56A]/20 bg-[#170104]/50 text-[#F7EEE8]/70 hover:border-[#C9A56A]/40'
                      }`}
                    >
                      {count} nəfər
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="mt-3 w-full py-3 rounded-full border border-[#C9A56A] bg-gradient-to-r from-[#7A1623] via-[#5A0712] to-[#7A1623] text-[#F7EEE8] text-xs font-montserrat font-medium uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(201,165,106,0.25)] hover:shadow-[0_4px_25px_rgba(201,165,106,0.4)] transition-all active:scale-[0.98]"
            >
              {submitButtonText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
