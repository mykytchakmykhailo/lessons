document.addEventListener('DOMContentLoaded', () => {
  console.log('pricing-animation.js loaded');
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length > 0) {
    console.log(`Found ${pricingCards.length} pricing cards`);
    pricingCards.forEach((card, index) => {
      setTimeout(() => {
        console.log(`Showing card ${index + 1} from ${card.getAttribute('data-direction')}`);
        card.classList.add('visible');
      }, 1000 + index * 800); // Початкова затримка 1с, кожна наступна картка +0.5с
    });
  } else {
    console.error('Pricing cards not found');
  }
});




