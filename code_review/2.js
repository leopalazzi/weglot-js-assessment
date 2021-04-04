//Use await every time 

async function getIndexes() {
   const res = await fetch('https://api.coingecko.com/api/v3/indexes');
   return await res.json();
}

async function analyzeIndexes() {
   const indexes = await getIndexes().catch(_ => {
      throw new Error('Unable to fetch indexes');
   });
   return indexes;
}