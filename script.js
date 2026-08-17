//learn more//


const clickItButton = document.getElementById("clickIt");
const aboutText = document.getElementById("create");
if (clickItButton && aboutText) {
    aboutText.style.display = "block";
  clickItButton.addEventListener("click", function () {
        const isHidden = aboutText.style.display === "none";
        aboutText.style.display = isHidden ? "block" : "none";
        clickItButton.textContent = isHidden ? "Show Less" : "Show More";
    });
}

//bookCatalogue

const books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Software Engineering",
        available: true,
        image: "img/a454cbce31231f83d3fd2727c36aab56.jpg"
    },
    {
        id: 2,
        title: "Cybersecurity Essentials",
        author: "Charles J. Brooks",
        category: "Cybersecurity",
        available: true,
        image: "img/abf2775d66cfce6727819eca504c7c15.jpg"
    },
    {
        id: 3,
        title: "Python for Data Analysts",
        author: "Wes McKinney",
        category: "Data Science",
        available: false,
        image: "img/ac80cd413167e4f5fc4545084ee9d19a.jpg"
    },
    {
        id: 4,
        title: "Computer Networking",
        author: "James Kurose",
        category: "Networking",
        available: true,
        image: "img/d948e31224528ad699066cd15bf59f10.jpg"
    },
    {
        id: 5,
        title: "Kubernetes Up and Running",
        author: "Kelsey Hightower",
        category: "Cloud Computing",
        available: false,
        image: "img/dc6832b379a1487cb8eaf05095c24bd3.jpg"
    },
    {
        id: 6,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        category: "Database",
        available: false,
        image: "img/e817bce140f85faebed4522a560fe395.jpg"
    }
];

const bookContainer = document.getElementById("bookContainer");

function displayBooks(){
    bookContainer.innerHTML = "";
    books.forEach(book => {
        const card = document.createElement("div");

        card.innerHTML = `
            <div class="book-card">
                <div class="cover">
                    <img src="${book.image || 'img/home-card.jpg'}" alt="${book.title} cover" />
                </div>
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${book.category}</p>
                <p class="status ${book.available ? 'available' : 'unavailable'}">${book.available ? "Available" : "Unavailable"}</p>
                <div class="card-actions">
                    <button class="delete-btn" data-id="${book.id}">Delete</button>
                        ${book.available ? `<button class="borrow-btn" data-id="${book.id}">Borrow</button>` : `<button class="return-btn" data-id="${book.id}">Return</button>`}
                </div>
            </div>
        `;

        bookContainer.appendChild(card);
    });

    // update remaining available books count
    const availableCount = books.filter(b => b.available).length;
    const borrowedCount = books.filter(b => !b.available).length;
    const totalCount = books.length;

    const availableEl = document.getElementById('availableCount');
    const borrowedEl = document.getElementById('borrowedCount');
    const totalEl = document.getElementById('totalCount');
    if(availableEl) availableEl.textContent = availableCount;
    if(borrowedEl) borrowedEl.textContent = borrowedCount;
    if(totalEl) totalEl.textContent = totalCount;
}

function addBook(){
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const categoryInput = document.getElementById('category');
    const availInput = document.getElementById('availabilty');

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const category = categoryInput.value.trim();
    const available = String(availInput.value).trim().toLowerCase() === 'true';

    if(!title || !author){
        alert('Please enter at least a title and author');
        return;
    }

    const newId = books.length ? Math.max(...books.map(b=>b.id)) + 1 : 1;
    const newBook = {
        id: newId,
        title,
        author,
        category: category || 'General',
        available: available,
        image: 'img/home-card.jpg'
    };

    books.push(newBook);
    titleInput.value = '';
    authorInput.value = '';
    categoryInput.value = '';
    availInput.value = '';
    displayBooks();
}

function deleteBook(id){
    const idx = books.findIndex(b => b.id === id);
    if(idx > -1){
        books.splice(idx,1);
        displayBooks();
    }
}

function returnBook(id){
    const b = books.find(b => b.id === id);
    if(b){
        b.available = true;
        displayBooks();
    }
}

// delegate actions for buttons inside the container
bookContainer.addEventListener('click', function(e){
    const del = e.target.closest('.delete-btn');
    if(del){
        const id = Number(del.getAttribute('data-id'));
        deleteBook(id);
        return;
    }
    const ret = e.target.closest('.return-btn');
    if(ret){
        const id = Number(ret.getAttribute('data-id'));
        returnBook(id);
        return;
    }
        const bor = e.target.closest('.borrow-btn');
        if(bor){
            const id = Number(bor.getAttribute('data-id'));
            borrowBook(id);
            return;
        }
});
function borrowBook(id){
    const b = books.find(b => b.id === id);
    if(b && b.available){
        b.available = false;
        displayBooks();
    }
}

const addBtn = document.getElementById('addBookBtn');
if(addBtn){
    addBtn.addEventListener('click', addBook);
}

displayBooks();