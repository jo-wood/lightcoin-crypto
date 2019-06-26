class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions){
      balance += transaction.value;
    }
    return balance;    
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value(){
    return this.amount;
  }
}

class Withdrawal extends Transaction {

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

  get value() {
    return -this.amount;
  }
}

// DRIVER CODE BELOW

const myAccount = new Account('billybob');

// console.log('Starting Balance:', myAccount.balance);


t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);
console.log('After t1 balance:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
// console.log('Transaction 3:', t3);
console.log('After t3 balance:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);
console.log('After t2 balance:', myAccount.balance);


console.log('Ending Balance:', myAccount.balance);
// console.log('Transaction history:', myAccount.transactions);
