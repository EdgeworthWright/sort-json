let debug = true;

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
        return order;
    },
    add: function (book) {
        this.items = this.getItems();
        this.items.push(book);
        localStorage.setItem('orderedBooks', JSON.stringify(this.items));
        document.querySelector('.cart__amount').innerHTML = this.items.length;
    },
    execute: function () {
        // empty output
        document.getElementById('output').innerHTML = "";

        this.items.forEach(book => {
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
            price.textContent = book.prijs.toLocaleString('nl-NL', {
                currency: 'EUR',
                style: 'currency'
            });

            // Buy button
            let button = document.createElement('button');
            button.className = 'bookSelection__button';
            button.innerHTML = 'Add to cart';
            button.addEventListener('click', () => {
                cart.add(book);
            });

            // add element
            section.appendChild(picture);
            section.appendChild(main);
            main.appendChild(title);
            main.appendChild(authors);
            main.appendChild(other);
            price.appendChild(button);
            main.appendChild(price);
            document.getElementById('output').appendChild(section);

        });
    }
}

cart.getItems();
cart.execute();