// Use filter instead of a for loop


async function getFilledIndexes() {
   try {
      const indexes = await getIndexes();
      const status = await getStatus();
      const usersId = await getUsersId();

      const filledIndexes = indexes.fiter((index) => {
               return index.status === status.filled && usersId.includes(index.userId);
      }, []);
      
      return filledIndexes;
   } catch(_) {
      throw new Error ('Unable to get indexes');
   }
}