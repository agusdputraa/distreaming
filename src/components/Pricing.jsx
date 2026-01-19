import { useState } from 'react';
import Icon from '../Icon/Icon';
import { PLANS } from '../data';

function Pricing({ plans = PLANS }) {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  return (
    <section className="py-16 px-4 md:px-[60px] bg-[#0a0a0a]">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400">
            Start watching today with our flexible subscription plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                relative p-6 rounded-xl cursor-pointer transition-all duration-300 flex flex-col h-full
                ${selectedPlan === plan.id
                  ? 'bg-gradient-to-b from-[#e50914]/20 to-[#141414] border-2 border-[#e50914] scale-105'
                  : 'bg-[#1a1a1a] border border-gray-800 hover:border-gray-600'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#e50914] text-white text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-xl md:text-lg font-bold text-white lg:text-2xl">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-md md:text-sm lg:text-lg">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm md:text-md lg:text-lg">
                    <Icon name="chevronRight" size={14} className="text-[#e50914]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full py-3 rounded-lg font-semibold transition-colors
                  ${selectedPlan === plan.id
                    ? 'bg-[#e50914] text-white hover:bg-[#f40612]'
                    : 'bg-[#333] text-white hover:bg-[#444]'
                  }
                `}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
