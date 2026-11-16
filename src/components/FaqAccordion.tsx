import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FaqItem } from '../data/siteData';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="overflow-hidden rounded-2xl border border-[#EAD8C8] bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[#102E49] transition hover:bg-[#FFF8F2]"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              {isOpen ? <ChevronUp size={18} className="text-[#EF7622]" /> : <ChevronDown size={18} className="text-[#EF7622]" />}
            </button>
            {isOpen && <p className="border-t border-[#FFF1E5] px-5 py-4 text-sm leading-7 text-slate-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
