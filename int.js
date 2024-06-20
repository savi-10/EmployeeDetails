const axios = require('axios');
// Async function to call get task API
 async function getTask() {
     try {
         const response = await axios.get('https://interview.adpeai.com/api/v2/get-task');
         console.log('****Get Task response ****');
        //  console.log(response.data);
          return response.data;
         } catch (error) { 
            console.error('Error fetching task data:', error); 
        }
     } 
 //  Async function to call submit task API
 async function submitTask(taskId, result) {
     try { 
        const response = await axios.post('https://interview.adpeai.com/api/v2/submit-task', { id: taskId, result: result });
        console.log('****Submit Task response ****');
         console.log(response.status);
        } catch (error) {
             console.error('Error submitting results:', error);
             }
             }
  // Function to Transaction details of last year top earner and last year top earner transactions get the transactionIDs where the type is alpha
  function employeeComputation(transactions) {
     const currentYear = new Date().getFullYear(); //presenrYear
     const priorYear = currentYear - 1; //previousyear
     const employeeEarnings = {}; //empEarnings
     transactions.forEach(transaction => { 
        const transactionYear = new Date(transaction.timeStamp).getFullYear(); //empTransactionYear
        if (transactionYear === priorYear) {
             const employeeId = transaction.employee.id; //empId
             if (!employeeEarnings[employeeId]) {
                 employeeEarnings[employeeId] = { name: transaction.employee.name, totalAmount: 0, transactions: [] }; 
                } 
                employeeEarnings[employeeId].totalAmount += transaction.amount; 
                employeeEarnings[employeeId].transactions.push(transaction);
             }
            }); 
                const topEarner = Object.values(employeeEarnings).reduce((max, employee) => employee.totalAmount > max.totalAmount ? employee : max, { totalAmount: 0 }); //highestSalaryEarner
                console.log('**** Transaction details of last year top earner: ****');
                console.log(topEarner);
                const alphaTransactionIDs = topEarner.transactions .filter(transaction => transaction.type === 'alpha') .map(transaction => transaction.transactionID);
                console.log('**** last year top earner transactions get the transactionIDs where the type is alpha. ****');
                console.log(alphaTransactionIDs);
                return alphaTransactionIDs; 
            }
   //Start point
    async function transactionsMain() {
         const taskDetails = await getTask(); 
        //  if (!taskDetails) return;
          const { id, transactions } = taskDetails;
          const submitRequestBody = employeeComputation(transactions); 
          await submitTask(id, submitRequestBody);
        }
        transactionsMain();