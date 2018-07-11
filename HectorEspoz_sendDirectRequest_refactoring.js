//My solution at the end of the file.

/*
 * Dear candidate, thank you for applying 
 * for the position of Frontend developer at Cubits. 
 * We kindly request that you complete this tech task 
 * in order to demonstrate your skills to us, 
 * most importantly we would like to understand 
 * your thought process and approach to tech tasks. 
 * 
 * The task is to refactor the following piece of code 
 * to make it more compact, beautiful and readable. 
 * It is totally up to you how you would like 
 * the final result to look. 
 * 
 * P.S. You can use all ES6 features.
 * 
 * P.P.S Good luck.
**/

export const sendDirectRequestWithPages = async props => {
  return new Promise(async (resolve, reject) => {
    const firstResults = await sendDirectRequest(props);
    let finalResults = [];
    const { list, pagination } = firstResults;
    finalResults = finalResults.concat(list);
    if (pagination.page_count === 1) {
      resolve(list);
    } else {
      let allRequests = [];
      for (var i = 2; i <= pagination.page_count; i++) {
        // For deep clone
        let newRequest = JSON.parse(JSON.stringify(props));
        newRequest.filters.paginate_by.page = i;
        let interimResults = await sendDirectRequest(newRequest);
        let { list, pagination } = interimResults;
        finalResults = finalResults.concat(list);
      }
      resolve(finalResults);
    }
  });
};

//My refactored solution :)
export const sendDirectRequestWithPages = async props => {

      let finalResults = [];

      //Normally I use lodash cloneDeep
      let clonedPayload = JSON.parse(JSON.stringify(props))

      //Executes first time.
      const { list, pagination } = await sendDirectRequest(clonedPayload);
      finalResults = finalResults.concat(list)

      /*
      * If pagination.page_count is not 1 
      * it will enter to the loop and fetch other pages. (I am assuming that even the elements return are 0 the page count is 1)
      */
      for (var i = 2; i <= pagination.page_count; i++) {
        clonedPayload.paginate_by.page = i
        finalResults = finalResults.concat((await sendDirectRequest(newRequest)).list)
      }

      return finalResults

}












