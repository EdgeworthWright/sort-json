let debug = true;

// Sort choice
let attribute = document.getElementById('attribute');
attribute.addEventListener('change', (e)=>{
    sortBookObj.attribute = e.target.value;
    sortBookObj.sort();
});
let sortWay = document.getElementsByName('sortWay');
sortWay.forEach((item) => {
    item.addEventListener('click', (e) => {
        sortBookObj.sortDirection = parseInt(e.target.value);
        sortBookObj.sort();
    })
})
// Import JSON
const url = "boeken.json";
let output = document.getElementById('output');


let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        sortBookObj.data = JSON.parse(this.responseText);
        sortBookObj.addDate();
        sortBookObj.sort();
    } else {
        if (debug) {
            console.log('readyState: ' + this.readyState + " status: " + this.status);
        }
    }
}
xmlhttp.open('GET', url, true);
xmlhttp.send();

// execute tablehead in markup from an array
const createTableHead = (arr) => {
    let head = "<table class='bookSelection'><tr>";
    arr.forEach((item) => {
        head += "<th>" + item + "</th>"; 
    });
    head += "</tr>";
    return head;
}

const createTableRow = (arr, accent) => {
    let row = "";
    accent ? row = "<tr class='bookSelection_row'>" : row = "<tr class='bookSelection_row--accent'>";
    arr.forEach((item) => {
        row += "<td class='bookSelection_cell'>" + item + "</td>"; 
    });
    row += "</tr>";
    return row;
}

// Function that converts a month-string an int
// Januari = 0 ... December = 11
const giveMonthNumber = (m) => {
    let number;

    switch(m){
        case "januari":
            number = 0;
            break;
        case "februari":
            number = 1;
            break;
        case "maart":
            number = 2;
            break;
        case "april":
            number = 3;
            break;
        case "mei":
            number = 4;
            break;
        case "juni":
            number = 5;
            break;
        case "juli":
            number = 6;
            break;
        case "augustus":
            number = 7;
            break;
        case "september":
            number = 8;
            break;
        case "oktober":
            number = 9;
            break;
        case "november":
            number = 10;
            break;
        case "december":
            number = 11;
            break;
        default:
            number = 0;
            break;
    }

    return number;
}

// Function that converts a string to date object
const createDate = (mY) => {
    let mYArray = mY.split(" "); 
    let date = new Date(mYArray[1], giveMonthNumber(mYArray[0]));
    return date;
}

// Authors function
const createSummary = (array) => {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        switch(i) {
            case array.length-1:
                string += array[i];
                break;
            case array.length-2:
                string += array[i] + " en ";
                break;
            default:
                string += array[i] + ", ";
                break;
        }
    }
    return string;
}

// Object that executes books and sorts them
// Properties: data, (sort)attribute
// Methods: sort(), execute()
let sortBookObj = {
    data: "",   // this.responseText

    attribute: "titel",

    sortDirection: 1,

    // add a date to this.data from string uitgave
    addDate: function() {
            this.data.forEach((item) => {
            item.date = createDate(item.uitgave);
        })
    },

    // sort data
    sort: function() {
        this.data.sort((a, b) => a[this.attribute] > b[this.attribute] ? 1*this.sortDirection : -1*this.sortDirection );

        this.execute(this.data);
    },

    // execute data
    execute: function(data) {
        let otherOutput = createTableHead([
            "titel", 
            "auteur(s)", 
            "cover", 
            "uitgave", 
            "taal", 
            "pagina's", 
            "ean"
        ]);
        for (let i = 0; i < data.length; i++) {
            // Give rows an accent
            let accent = false;

            i%2 == 1 ? accent = true : accent = false;

            let img = "<img class='bookSelection_cover' src='"+data[i].cover+"' alt='"+data[i].titel+"'>"
            
            // Make summary of authors
            let authors = createSummary(data[i].auteur);
            otherOutput += createTableRow([
                data[i].titel, 
                authors, 
                img, 
                data[i].uitgave, 
                data[i].taal, 
                data[i].paginas, 
                data[i].ean
            ], accent);
        }
        output.innerHTML = otherOutput;
    }
}
