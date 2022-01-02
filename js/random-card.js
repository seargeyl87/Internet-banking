const randomTotal = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
};

function addNewCart() {
let name = ["Alysa", "Wenona", "Lorene", "Elsdon", "Tracy", "Callie", "Alise", "Frederica", "Jacquelyn", "Yancy", "Jaynie", "Tabitha", "Rayner", "Jake", "Laurena"];
  let surname = ["Bobbie", "Constance", "Maxine", "Kester", "Fredrick", "Sylvia"]; 
  let transactionDates = ["2021-11-06 12:23", "2021-11-10 12:23", "2021-11-22 12:23", "2021-11-21 12:03", "2021-11-017 11:00", "2021-11-06 01:14", "2021-11-15 12:29", "2021-11-06 12:03", "2021-11-20 13:30"];
  let spentAmount = randomTotal(10, 250);
  let email = ["games398475@info.com", "hello474747@info.com", "softwiyi@info.com", "soft3336@info.com", "sofrtt4234@info.com", "dsfskfj4343443@info.com", "englqe45@info.com", "sder294@info.com"]
  let currencySymbols = "$";
  let transactionType = [1, 2, 3];
  let urlImg = ["foto/Group.png", "foto/Group-2.png", "foto/Group-3.png", "foto/Group-4.png", "foto/Group-5.png"]
  

let randomName = name[Math.floor(Math.random() * name.length)];
  let randomSurname = surname[Math.floor(Math.random() * surname.length)];
  let randomEmail = email[Math.floor(Math.random() * email.length)];
  let randomTransactiontionDate = transactionDates[Math.floor(Math.random() * transactionDates.length)];
  let randomTransactionType = transactionType[Math.floor(Math.random() * transactionType.length)];
  let randomImg = urlImg[Math.floor(Math.random() * urlImg.length)]

  let newTranzaction = {
      firstName: randomName,
      lastName: randomSurname,
      email: randomEmail,
      date: randomTransactiontionDate,
      amount: spentAmount,
      currency: currencySymbols,
      transactionType: randomTransactionType,
      imgUrl: randomImg
  }
return newTranzaction;
};

//setInterval(postData, 1000);

function postData() {
  const url = "newtransact.json";
  const data = addNewCart();
  
  try {
    fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data), 
    });

    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
 