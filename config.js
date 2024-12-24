const cardNameMapping = {
    'Dactivity.csv': 'Discover',
    'AEactivity.csv': 'American Express Everyday',
    'APactivity.csv': 'American Express Platinum',
    'CPactivity.csv': 'Citi Premier',
    'CRactivity.csv': 'Citi Reward+'
  };
  
  const categoryMapping = {
    // Penalty
    'LATE FEE': 'Penalty',
    'INTEREST': 'Penalty',
  
    // Payment
    'PAYMENT': 'Payment',
    'CASHBACK BONUS REDEMPTION PYMT/STMT CRDT': 'Payment',
    'AMERICAN EXPRESS COMNEW YORK':'Payment',
  
    // Gas
    'GATE': 'Gas',
    'CIRCLE K' : 'Gas',
    'BUC-EE' : 'Gas',
  
    // Restaurants
    'MINERVA': 'Restaurants',
    'DUNKIN': 'Restaurants',
    'PAPA JOHN\'S': 'Restaurants',
    'FIRST WATCH': 'Restaurants',
    'PIZZA HUT': 'Restaurants',
    'PANDA EXPRESS': 'Restaurants',
    'BJS RESTAURANTS': 'Restaurants',
    'TACO BELL': 'Restaurants',
    'DOMINOS': 'Restaurants',
    'OLIVE GARDEN': 'Restaurants',
    'STARBUCKS': 'Restaurants',
    'CALIFORNIA PIZZA':'Restaurants',
    'KIA ORLANDO':'Restaurants',
    'MELLOW':'Restaurants',
    '5GUYS':'Restaurants',
    'MESA':'Restaurants',
    'CHEESECAKE':'Restaurants',
    'SEVEN BRIDGES':'Restaurants',
    'CHICK-FIL-A':'Restaurants',
    'TROPICAL':'Restaurants',
    'CULHANES':'Restaurants',

    // Groceries
    'WALMART': 'Groceries',
    'WAL-MART': 'Groceries',
    'WMT PLUS': 'Groceries',
    'PUBLIX': 'Groceries',
    'GROCERY': 'Groceries',
    'PATEL BROTHERS': 'Groceries',
    'LIQUORS': 'Groceries',
  
    // Fitness
    'BAILEY': 'Fitness',
  
    // Vape
    'SMOKE': 'Vape',
    'Prime Time Va': 'Vape',
  
    // Misc
    'APPLE.COM/BILL': 'Misc',
    'JAGUAR LAND ROVER': 'Misc',
    'REDIST': 'Misc',
    'LICENSE TAG': 'Misc',
    'TAKE 5' : 'Misc',
    'SURFSHARK':'Misc',
    'JOIN VENTURES':'Misc',
    'MEMBERSHIP FEE':'Misc',
    'STUBHUB':'Misc',
   
    // Entertainment
    'PEACOCK': 'Entertainment',
  
    // Shopping
    'BATH AND BODY': 'Shopping',
    'DICK\'S SPORTI': 'Shopping',
    'LUSH COSMETIC': 'Shopping',
    'IKEA': 'Shopping',
    'TARGET': 'Shopping',
    'AMZN Mktp US': 'Shopping',
    'Amazon': 'Shopping',
    'DOLLAR TREE': 'Shopping',
    'HOME DEPOT': 'Shopping',
    'ROSS':'Shopping',
    'GOODWILL':'Shopping',
    'HOMEGOODS':'Shopping',
    
    // Pet
    'FOREVER VETS ANIMAL': 'Pet',
    'FETCH': 'Pet',
    'PETSMART': 'Pet',
    'HUMJACKSONVILLE' : 'Pet',
    'PET':'Pet',
  
    // Food Delivery
    'UBER': 'Food Delivery',
  
    // Utilities
    'COMCAST': 'Utilities',
    'T-MOBILE': 'Utilities',
    'TMOBILE': 'Utilities',
    'OPENAI': 'Utilities',
    'JEA': 'Utilities',
    'CHATGPT': 'Utilities',
  
    // Insurance
    'CHESAPEAKE-UHC': 'Insurance',
    'GEICO AUTO': 'Insurance',
  
    // Transportation
    'PARKING': 'Transportation',
    'SUNPASS': 'Transportation',
    'U-HAUL': 'Transportation'
};
  
const getCategory = (description) => {
    description = description.toUpperCase().trim();
    for (const [key, value] of Object.entries(categoryMapping)) {
      if (description.includes(key.toUpperCase().trim())) {
        return value;
      }
    }
    return 'Uncategorized';
  };
  
  // Test cases
  console.log(getCategory('JOIN VENTURES PTE. LSINGAPORE SG')); // Should return 'Misc'
  console.log(getCategory('MEMBERSHIP FEE JUN 24-MAY 25')); // Should return 'Misc'
  console.log(getCategory('GOODWILL - SOUTHSIDE JACKSONVILLE FL')); // Should return 'Shopping'
  
  module.exports = { cardNameMapping, categoryMapping, getCategory };
  