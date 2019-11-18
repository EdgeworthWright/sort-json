let debug = true;

// execute tablehead in markup from an array
const createTableHead = (arr) => {
    let head = "<table class='orderedBook'><tr>";
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

    switch (m) {
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

// Function that moves text after comma
const reverseText = (string) => {
    if (string.indexOf(',') != -1) {
        let array = string.split(',');
        string = array[1] + ' ' + array[0];
    }
    return string;
}

// Cart that has
// Books
// Method: Show books
// Method: Add books
// Method: Delete books
let cart = {
    items: [],
    getItems: function () {
        let order;
        if (localStorage.getItem('orderedBooks') == null) {
            order = [];
        } else {
            order = JSON.parse(localStorage.getItem('orderedBooks'));
            document.querySelector('.cart__amount').innerHTML = order.length;
        }
        order.forEach(item => {
            this.items.push(item);
        })
        return order;
    },
    execute: function () {
        // empty output
        document.getElementById('outputCart').innerHTML = "";

        this.items.forEach(book => {
            let section = document.createElement('section');
            section.className = 'orderedBook';

            // Main with everything except for price and img
            let main = document.createElement('main');
            main.className = "orderedBook__main";

            // Cover
            let picture = document.createElement('img');
            picture.className = 'orderedBook__cover';
            picture.setAttribute('src', book.cover);
            picture.setAttribute('alt', book.titel);

            // Title
            let title = document.createElement('h3');
            title.className = 'orderedBook__title';
            title.textContent = reverseText(book.titel);

            // Price
            let price = document.createElement('div');
            price.className = 'orderedBook__price';
            price.textContent = book.prijs.toLocaleString('nl-NL', {
                currency: 'EUR',
                style: 'currency'
            });

            // Delete button
            let deleteButton = document.createElement('div');
            deleteButton.className = 'orderedBook__delete';

            // add element
            section.appendChild(picture);
            section.appendChild(main);
            section.appendChild(title);
            section.appendChild(price);
            section.appendChild(deleteButton);
            document.getElementById('outputCart').appendChild(section);

        });
    }
}

cart.getItems();
cart.execute();