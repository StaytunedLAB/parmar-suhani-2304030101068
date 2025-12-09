function safeNumber(value) {
    const num = Number(value);
    return isNaN(num) ? null : num;
}
function isValidType(type) {
    return type === "Deposit" || type === "Withdraw";
}
function processBankAccount(accountData) {
    const input = JSON.parse(JSON.stringify(accountData)); 
    const applied = [];
    const rejected = [];
    let auditLog = "";
    let balance = safeNumber(input.initialBalance);
   if (balance === null || balance < 0) balance = 0;
      try {
        for (const tx of input.transactions) {
           if (!tx || typeof tx !== "object") {
                rejected.push({
                    transaction: tx,
                    reason: "Invalid transaction object"
                });
                continue;
            }
            const type = tx.type;
            const amt = safeNumber(tx.amount);
           if (!type || !isValidType(type)) {
                rejected.push({
                    transaction: tx,
                    reason: "Invalid or missing transaction type"
                });
                continue;
            }
           if (amt === null || amt <= 0) {
                rejected.push({
                    transaction: tx,
                    reason: "Invalid or non-positive amount"
                });
                continue;
            }
           if (type === "Deposit") {
                balance += amt;
                applied.push({ type, amount: amt });
            }
           if (type === "Withdraw") {
                if (amt > balance) {
                    rejected.push({
                        transaction: tx,
                        reason: "Insufficient balance"
                    });
                    continue;
                }
                balance -= amt;
                applied.push({ type, amount: amt });
            }
        }
   } catch (err) {
        rejected.push({
            transaction: null,
            reason: "System Error: " + err.message
        });
} finally {
        auditLog = "Processing completed successfully (audit log created).";
        console.log("\n🔎 " + auditLog + "\n");
    }
    console.log("account processing");
    console.log("account summary");
    console.log("\n");
    console.table({
        "Account Number": input.accountNumber,
        "Holder Name": input.holderName,
        "Currency": input.currency,
        "Initial Balance": input.initialBalance,
        "Final Balance": balance
    });
    console.log("\napplied transactions");
    console.table(applied.length > 0 ? applied : [{ info: "No applied transactions" }]);
    console.log("\nrejected transactions");
    const rejectTable = rejected.map(r => ({
        Type: r.transaction?.type || "N/A",
        Amount: r.transaction?.amount || "N/A",
        Reason: r.reason
    }));
    console.table(rejectTable.length > 0 ? rejectTable : [{ info: "No rejected transactions" }]);
    console.log("end of report");
    console.log("\n");
return {
        ...input,
        finalBalance: balance,
        applied,
        rejected,
        auditLog
    };
}
const exampleInput = {
    accountNumber: "AC12345",
    holderName: "suhani parmar",
    currency: "INR",
    initialBalance: "500",
    transactions: [
        { type: "Deposit", amount: 200 },
        { type: "Withdraw", amount: 100 },
        { type: "Withdraw", amount: 800 },
        { type: "Deposit", amount: "xyz" },
        { amount: 50 },
        { type: "Send", amount: 40 },
        null,
        { type: "Withdraw", amount: -20 }
    ]
};
processBankAccount(exampleInput);
  
