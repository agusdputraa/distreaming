import { useState } from 'react';

function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-16 px-4 md:px-[60px] border-t-8 border-[#222]/50">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-10 text-white">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-[800px] mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-1.5 md:mb-2">
            <button 
              className="
                w-full flex justify-between items-center 
                p-4 md:p-6 
                bg-[#2d2d2d] hover:bg-[#404040] 
                transition-colors duration-200 
                text-white text-base md:text-xl font-normal text-left cursor-pointer border-none
              "
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span 
                className={`
                  text-xl md:text-2xl font-light 
                  transform transition-transform duration-300
                  ${openIndex === index ? 'rotate-45' : 'rotate-0'}
                `}
              >
                +
              </span>
            </button>
            
            <div 
              className={`
                overflow-hidden bg-[#2d2d2d] 
                transition-all duration-300 ease-in-out
                ${openIndex === index ? 'max-h-[500px] border-t border-black p-4 md:p-6' : 'max-h-0 py-0 px-4 md:px-6'}
              `}
            >
              <p className="text-sm md:text-base leading-relaxed text-[#d2d2d2] m-0">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
