google.charts.load("current", { "packages": ["corechart"] });
google.charts.setOnLoadCallback(onChangeChartEvent);



let historyTransactions = [];
let filteredTransactions = [];
let searchValue = "";
let dataCards = "";

let chartTransactions = [];
let dateRange = {
    "Daily": 1,
    "Weekly": 2,
    "Monthly": 3,
    "Yearly": 4
}
let dateRangeChart = {
    "Day": 1,
    "Week": 2,
    "Month": 3,
    "Year": 4
}

let transactionType = {
    "Sent": 1,
    "Pending": 2,
    "Received": 3
};
let transactionStatus = {
    "Sent": 1,
    "Pending": 2,
    "Received": 3,
    "All Status": 4
};

 function search() {
     renderHistory();
     document.getElementById("searchInput").value = "";
     
 }


function onChangeEvent() {
    loadHistoryTransactions();
    renderHistory()
}
onChangeEvent();



function loadHistoryTransactions() {
    let getData = () => { 
        fetch('massiv.json')
            .then(
                (req) => {
                    return req.json();
                }
            )
            .then(
                (data) => {
                    filteredTransactions = data;
                    historyTransactions = data;
                    renderHistory();
                    selectStatusTransaction();
                })  

    }
    getData()

}

function renderHistory() {
    filterTransaction();
    let selecttime1 = document.getElementById("selecttime1");
    let value = selecttime1.value;
    filterTransaction(value);
    let transactionContainer = document.querySelector(".transaction_container");
    transactionContainer.innerHTML = '';
    filteredTransactions.forEach((item) => {
        var statusClass = "";
        var statusText = "";

        if (item.transactionType == transactionType.Sent) {
            statusClass = "sent";
            statusText = "Sent";
        }
        else if (item.transactionType == transactionType.Pending) {
            statusClass = "pending";
            statusText = "Pending";
        }
        else if (item.transactionType == transactionType.Received) {
            statusClass = "received";
            statusText = "Received";
        }

        transactionContainer.innerHTML +=
            `<div class="transaction">
        <div class="person">
            <div class="foto"><img src="${item.personImage}"></div>
            <div class="data-person">
            <div class="names">${item.firstName} ${item.lastName}</div>
            <div class="gmail">${item.email}</div>
        </div>
        </div>
        <div class="cash"><p>${item.currency} ${item.amount}</p></div>
        <div class="status ${statusClass}">${statusText }</div>
        <div class="data">
            ${item.date.toLocaleString()}
        </div>
        `
    })

}

function filterTransaction(dateRangeParam) {
    let selectStatus = document.getElementById("select_status_transaction");
    var value = selectStatus.options[selectStatus.selectedIndex].value;
    if(value==dateRange.Daily) {
        filteredTransactions = historyTransactions.filter(x => x.transactionType==1)
    } else  if(value==dateRange.Weekly) {
        filteredTransactions = historyTransactions.filter(x => x.transactionType==2)
    }
    else  if(value==dateRange.Monthly) {
        filteredTransactions = historyTransactions.filter(x => x.transactionType==3)
    } else  if(value==dateRange.Yearly) {
        filteredTransactions = historyTransactions;
    }

    
    if (dateRangeParam && dateRangeParam == dateRange.Daily) {
        var previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 1);
        filteredTransactions = filteredTransactions.filter(x => new Date(x.date) > previousDay);
    } 
    else if (dateRangeParam && dateRangeParam == dateRange.Weekly) {
        var previous30Day = new Date();
        previous30Day.setDate(previous30Day.getDate() - 7);
        filteredTransactions = filteredTransactions.filter(x => new Date(x.date) > previous30Day);
    }
    else if (dateRangeParam && dateRangeParam == dateRange.Monthly) {
        var previous30Day = new Date();
        previous30Day.setDate(previous30Day.getDate() - 30);
        filteredTransactions = filteredTransactions.filter(x => new Date(x.date) > previous30Day);
    } else if (dateRangeParam && dateRangeParam == dateRange.Yearly) {
        var previous365Day = new Date();
        previous365Day.setDate(previous365Day.getDate() - 365);
        filteredTransactions = filteredTransactions.filter(x => new Date(x.date) > previous365Day);
    }
    searchValue = document.getElementById("searchInput").value;
    filteredTransactions = filteredTransactions.filter(x => x.firstName.includes(searchValue) || x.lastName.includes(searchValue))
    
}

function selectStatusTransaction() {
      renderHistory();
}
selectStatusTransaction()


function loadChartTransactions(dateRangeParamChart) {

    let getData = () => { 
        fetch('massiv.json')
            .then(
                (req) => {
                    return req.json();
                }
            )
            .then(
                (data) => {
                    if (dateRangeParamChart && dateRangeParamChart == dateRangeChart.Day) {
                        var previousDay = new Date();
                        previousDay.setDate(previousDay.getDate() - 1); 
                        data = data.filter(x => new Date(x.date) > previousDay);
                        
                    } 
                    else
                    if (dateRangeParamChart && dateRangeParamChart == dateRangeChart.Week) {
                        var previous7Day = new Date();
                        previous7Day.setDate(previous7Day.getDate() - 7); 
                        data = data.filter(x => new Date(x.date) > previous7Day);
                    }
                    else
                    if (dateRangeParamChart && dateRangeParamChart == dateRangeChart.Month) {
                        var previous30Day = new Date();
                        previous30Day.setDate(previous30Day.getDate() - 30); 
                        data = data.filter(x => new Date(x.date) > previous30Day);
                    }
                    chartTransactions = data;
                    renderChart();
                })

    }
    getData()

}

function renderChart() {
    
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"]
    let data = [];

    for (month of months) {
        data.push({
            month: month,
            sent: 0,
            recevied: 0,
            pending: 0
        });
    }

    for (let transaction of chartTransactions) {
        let date = new Date(transaction.date);

        let month = date.getMonth();

        if (transaction.transactionType == transactionType.Sent) {
            data[month].sent += transaction.amount;
        }
        else if (transaction.transactionType == transactionType.Pending) {
            data[month].pending += transaction.amount;
        }
        else if (transaction.transactionType == transactionType.Received) {
            data[month].recevied += transaction.amount;
        }
    }
    data = data.map(x => [x.month, x.sent, x.recevied, x.pending]);

    data.unshift(["month", "sent", "recevied", "pending"]);


    var googleDataArray = google.visualization.arrayToDataTable(data);
    var options = {
        title: "Company Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 }
    };

    var chart = new google.visualization.AreaChart(document.getElementById("areachart"));
    chart.draw(googleDataArray, options);

}

function onChangeChartEvent() {
    let selecttime = document.getElementById("selecttime");
  var value = selecttime.options[selecttime.selectedIndex].value;
  loadChartTransactions(value);
}

function loadAccount() {
    let getData = () => {
        fetch("account.json")
            .then(
                (req) => {
                    return req.json();
                }
            )
            .then(
                (data) => {
                    dataCards = data;
                    renderAccount();
                })

    }
    getData()

}
loadAccount()

function renderAccount() {
let containerCard = document.getElementById("container-card");
containerCard.children[0].innerHTML += `<div class="card-second">
</div>
<div class="card-third">
</div>
<div class="card-header">
    <div class="card-type">${dataCards.cardName.toUpperCase()}</div>
    <div class="card-bank">${dataCards.bankName}</div>
</div>
<div class="vector">
</div>
<div class="digits">
    <span>${dataCards.cardNumber.substr(0, 4)}</span><span>${dataCards.cardNumber.substr(5, 4)}</span><span>${dataCards.cardNumber.substr(10, 4)}</span><span>${dataCards.cardNumber.substr(15, 4)}</span>
</div>
<div class="some-little-digits">
    ${dataCards.cvv}
</div>
<div class="valid-block">
    <div class="text-block">VALID<br>THRU</div>
    <div class="valid-date">${dataCards.expirationDate}</div>
</div>
<div class="card-holders-name">
    ${dataCards.cardOwner.toUpperCase()}
</div>`


containerCard.children[1].innerHTML += `<div class=spent-sum>
<div class="currency">${dataCards.currencySymbol.toLocaleString()}</div>
<div class="spentamount">${dataCards.spentAmount}</div>
</div>
<div class="ballance-amount">
    <div class="percent">${Math.floor((dataCards.spentAmount/dataCards.ballanceAmount)*100)}%</div>
    <div class="percent-txt">from total balance</div>
    </div>`


    containerCard.children[2].innerHTML += `<div class=spent-sum-balance>
    <div class="currency-balance">${dataCards.currencySymbol.toLocaleString()}</div>
    <div class="spentamount-balance">${dataCards.ballanceAmount}</div>
    </div>
    <div class="ballance-amount-card3">
        <div class="percent-card3">${Math.floor((dataCards.ballanceAmount/dataCards.spentAmount)*100)}%</div>
        <div class="percent-txt-card3">from spent</div>
        </div>`
}


