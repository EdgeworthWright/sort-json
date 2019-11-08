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
        // The data must have a property for capital letters
        sortBookObj.data.forEach( book => {
            book.titelUpper = book.titel.toUpperCase();
            // Lastname first author
            book.authorSort = book.auteur[0];
        });

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

// Function that moves text after comma
const reverseText = (string) => {
    if (string.indexOf(',') != -1) {
        let array = string.split(',');
        string = array[1] + ' ' + array[0];
    }
    return string;
}
// Object that executes books and sorts them
// Properties: data, (sort)attribute
// Methods: sort(), execute()
let sortBookObj = {
    data: "",   // this.responseText

    attribute: "titelUpper",

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
        // empty output
        document.getElementById('output').innerHTML = "";

        data.forEach( book => {
            let section = document.createElement('section');
            section.className = 'bookSelection';

            // Main with everything except for price and img
            let main = document.createElement('main');
            main.className = "bookSelection__main";

            // Cover
            let picture = document.createElement('img');
            picture.className = 'bookSelection__cover';
            picture.setAttribute('src', book.cover);
            picture.setAttribute('alt', book.titel);

            // Title
            let title = document.createElement('h3');
            title.className = 'bookSelection__title';
            title.textContent = reverseText(book.titel);

            // Authors
            let authors = document.createElement('p');
            authors.className = 'bookSelection__author';
            // Reverse 1st authors name
            book.auteur[0] = reverseText(book.auteur[0]);
            authors.textContent = createSummary(book.auteur);

            // other
            let other = document.createElement('p');
            other.className = 'bookSelection__other';
            other.textContent = book.uitgave + '\r\npages: ' + book.paginas + '\r\n' + book.taal + '\r\nean: ' + book.ean;

            // Price
            let price = document.createElement('div');
            price.className = 'bookSelection__price';
            price.textContent = book.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});
            
            // add element
            section.appendChild(picture);
            section.appendChild(main);
            main.appendChild(title);
            main.appendChild(authors);
            main.appendChild(other);
            main.appendChild(price);
            document.getElementById('output').appendChild(section);
        });   
    }
}
