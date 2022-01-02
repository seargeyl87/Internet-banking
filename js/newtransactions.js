
let historyTransactions = [];
let filteredTransactions = [];
let searchValue = "";
let dataCards = "";
let chartTransactions = [];
let show10Transaction = 5;

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
     
 }


function onChangeEvent() {
    loadHistoryTransactions();
    renderHistory()
}
onChangeEvent();



function loadHistoryTransactions() {
    let getData = () => {
        fetch("newtransact.json")
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

function plusTen() {
    show10Transaction = show10Transaction + 5;
    renderHistory()
}

function renderHistory() {
    filterTransaction();
    let selecttime1 = document.getElementById("selecttime1");
    let value = selecttime1.value;
    filterTransaction(value);
    let transactionContainer = document.querySelector(".transaction_container");
    transactionContainer.innerHTML = "";
    
    filteredTransactions.forEach((item, index) => {
        if(index < show10Transaction) {
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
            <div class="foto"><img src="${item.imgUrl}"></div>
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
    }
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




