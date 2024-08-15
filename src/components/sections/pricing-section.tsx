import React from 'react';
import { CardContainer, CardItem, CardBody } from '@/components/global/3d-card';
import { CheckIcon } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    { name: 'Basic', price: '$0', features: ['3 Free automations', '100 tasks per month', 'Two-step Actions'] },
    { name: 'Pro Plan', price: '$29', features: ['3 Free automations', '100 tasks per month', 'Two-step Actions'] },
    { name: 'Unlimited', price: '$99', features: ['3 Free automations', '100 tasks per month', 'Two-step Actions'] },
  ];

  return (
    <section className="mt-[-200px]">
      <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
        {plans.map((plan) => (
          <CardContainer key={plan.name} className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                {plan.name}
                <h2 className="text-6xl">{plan.price}</h2>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Get a glimpse of what our software is capable of. Just a heads up {"you'll"} never leave us after this!
                <ul className="my-4 flex flex-col gap-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  Try now →
                </CardItem>
                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                  Get Started Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
