const searchBtn = document.getElementById('search-btn');
const cartList = [];
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchFood()
})

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    if (!searchText) {
        //TODO
    } else {
        const spinner = document.getElementById('spinner');
        spinner.classList.remove("d-none");
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                showFood(data)
            })
    }

}


const showFood = (data) => {
    const foodContainer = document.getElementById('food-container');
    const detailContainer = document.getElementById('detail-container');
    detailContainer.textContent = '';
    foodContainer.textContent = '';

    const foodList = data.meals;
    if (!foodList) {
        //TODO
    } else {
        spinner.classList.add("d-none");
        foodList.forEach(e => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <div>
                        <img src="${e.strMealThumb}" class="card-img-top p-2 img-fluid food-img" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-center">${e.strMeal}</h5>
                        <button onclick="loadDetail(${e.idMeal})" class="btn btn-outline-secondary w-100" type="button" id="detail-btn">Detail</button>
                    </div>
                </div>  
            `
            foodContainer.appendChild(div)
        })
    }
}

const loadDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showLoadedDetail(data)
        })
}


const showLoadedDetail = mealDetail => {
    window.scrollTo(0, 40);
    const meal = mealDetail.meals[0]
    console.log(meal)
    const { idMeal, strMeal, strInstructions, strMealThumb, strYoutube } = meal;
    const detailContainer = document.getElementById('detail-container');
    detailContainer.textContent = '';

    detailContainer.innerHTML = `
        <div class="card mx-5 p-3 w-3/4">   
            <div class="card-body">
                <div class="d-flex flex-row">
                    <div>
                        <h5 class="card-title">${strMeal}</h5>
                        <h6>Ingredients:</h6>
                        <ul id="ingredient-list"></ul>
                    </div>
                    <div class="w-50 mx-auto">
                        <img src="${strMealThumb}" class="card-img-top img-fluid food-img" alt="...">
                    </div>
                </div>
                <p class="card-text">${strInstructions}</p>
                <a href="${strYoutube}" class="btn btn-primary" target="_blank">Checkout Video</a>
                <a href="#" onclick="addToCart(${idMeal})" class="btn btn-primary">Add to Cart</a>
            </div>
        </div>
    `
    const ingredientList = document.getElementById('ingredient-list');

    for (let i = 1; i <= 20; i++) {
        let ingredientKey = "strIngredient" + i;
        let ingredient = meal[ingredientKey];

        let quantityKey = "strMeasure" + i;
        let quantity = meal[quantityKey];

        let listItem = `${quantity} ${ingredient}`;

        const li = document.createElement("li");

        if (listItem.length > 2 && listItem.indexOf("null null") != 0) {
            li.innerText = listItem;

            ingredientList.appendChild(li);
        }

    }
}


const addToCart = async (id) => {

    const cartContainer = document.getElementById('cart-container');
    cartContainer.textContent = '';
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

    const res = await fetch(url);
    const data = await res.json()
    const meal = data.meals[0]

    cartList.push(meal);

    document.getElementById('cart-count').innerText = cartList.length;

    for (item of cartList) {
        const { strMeal, strMealThumb } = item;

        const div = document.createElement('div');
        div.classList.add('row', 'gy-5', 'mb-2');

        div.innerHTML = `
            <div class="col-md-6">
                <img src="${strMealThumb}" class="img-fluid rounded-circle" alt="..." width="50">
            </div>
            <div class="col-md-6">
                <h3>${strMeal}</h3>
            </div>
        `
        cartContainer.appendChild(div);
    }
}


// const showError = () => {

// }

