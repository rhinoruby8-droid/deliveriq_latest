import { useState } from 'react';
import CheckoutButton from './CheckoutButton';
import { Check, Sparkles, Clock, Play } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface PricingTiersProps {
  basePrice: number;
  sessionTitle: string;
  sessionId: string;
  showOnlyPro?: boolean;
  couponCode?: string;
}

export default function PricingTiers({
  basePrice,
  sessionTitle,
  sessionId,
  showOnlyPro = false,
  couponCode
}: PricingTiersProps) {
  const [selectedTier, setSelectedTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier2');

  const tier1Price = Math.round(basePrice * 0.7);
  const tier2Price = basePrice;
  const tier3Price = 199.00;

  const tiers = [
    {
      id: 'tier1' as const,
      name: 'Basic',
      price: tier1Price,
      description: 'Cheapest subscription for live access only.',
      features: [
        'Access to the live session',
        'Interactive Q&A',
        'Digital attendance certificate'
      ],
      icon: Play,
      iconColor: 'text-neutral-400'
    },
    {
      id: 'tier2' as const,
      name: 'Standard',
      price: tier2Price,
      description: 'Live session access plus 3 months of recording replays.',
      features: [
        'Access to the live session',
        'Watch recording replays for 3 months',
        'Interactive Q&A',
        'Digital attendance certificate',
        'Session slides and resources'
      ],
      icon: Clock,
      iconColor: 'text-primary',
      popular: true
    },
    {
      id: 'tier3' as const,
      name: 'Pro',
      price: tier3Price,
      description: 'Full access to all past and upcoming sessions for a full year.',
      features: [
        'Access to all past sessions (free & paid)',
        'Access to all upcoming live sessions',
        'Watch recording replays for 1 year',
        'Interactive Q&A & resources',
        'Exclusive Pro templates & Discord'
      ],
      icon: Sparkles,
      iconColor: 'text-amber-400'
    }
  ];

  const visibleTiers = showOnlyPro ? tiers.filter(t => t.id === 'tier3') : tiers;

  const getCheckoutTitle = () => {
    if (selectedTier === 'tier3' || showOnlyPro) {
      return 'DeliverIQ Pro Yearly Subscription';
    }
    const suffix = selectedTier === 'tier1' ? 'Basic Access' : 'Standard Access';
    return `${sessionTitle} - ${suffix}`;
  };

  const getCheckoutAmount = () => {
    if (selectedTier === 'tier3' || showOnlyPro) return tier3Price;
    if (selectedTier === 'tier1') return tier1Price;
    return tier2Price;
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleTiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id || showOnlyPro;
          return (
            <Card
              key={tier.id}
              onClick={() => !showOnlyPro && setSelectedTier(tier.id)}
              className={`relative flex flex-col justify-between transition-all duration-300 border ${
                showOnlyPro ? 'col-span-3 max-w-md mx-auto w-full' : ''
              } ${
                isSelected
                  ? 'border-primary bg-card/80 shadow-[0_0_20px_rgba(199,154,78,0.15)] scale-[1.02]'
                  : 'border-border bg-background/40 hover:border-primary/30 cursor-pointer'
              }`}
            >
              {tier.popular && !showOnlyPro && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[#1A1D24] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full z-10">
                  Popular
                </span>
              )}
              
              <CardHeader className="p-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wider font-sans">{tier.name}</CardTitle>
                  <Icon className={`w-5 h-5 ${tier.iconColor}`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-sans">${tier.price}</span>
                  {(tier.id === 'tier3' || showOnlyPro) && <span className="text-xs text-muted-foreground font-sans">/year</span>}
                </div>
                <CardDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">{tier.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 pt-0 flex-1">
                <ul className="space-y-2.5 text-xs text-foreground">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {!showOnlyPro && (
                <CardFooter className="p-6 pt-4 border-t border-border/40">
                  <span className={`text-xs font-semibold px-4 py-2.5 rounded-sm border w-full block text-center transition-colors font-sans ${
                    isSelected
                      ? 'bg-primary text-[#1A1D24] border-primary'
                      : 'bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-white'
                  }`}>
                    {isSelected ? 'Selected' : 'Select Plan'}
                  </span>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>

      <div className="border-t border-border/40 pt-6 mt-4 flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">You are purchasing:</p>
          <h4 className="text-sm font-bold text-white mt-1">
            {getCheckoutTitle()}
          </h4>
          <p className="text-lg font-extrabold text-primary mt-1">
            Total: ${getCheckoutAmount()}
          </p>
        </div>

        <CheckoutButton
          sessionTitle={getCheckoutTitle()}
          amount={getCheckoutAmount()}
          tier={showOnlyPro ? 'tier3' : selectedTier}
          sessionId={sessionId}
          label={showOnlyPro ? 'Continue Subscription' : 'Purchase Plan'}
          className="w-full max-w-sm"
          couponCode={couponCode}
        />
      </div>
    </div>
  );
}
