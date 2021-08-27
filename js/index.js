const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    if (!searchText) {
        //
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                showFood(data)
            })
    }

}


const showFood = (data) => {
    const foodList = data.meals;
    const foodContainer = document.getElementById('food-container');
    const detailContainer = document.getElementById('detail-container');
    detailContainer.textContent = '';
    foodContainer.textContent = '';
    if (!foodList) {
        //
    } else {
        foodList.forEach(e => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${e.strMealThumb}" class="card-img-top p-2 img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.strMeal}</h5>
                        <p class="card-text">${e.strInstructions.slice(0, 100)}<p>
                        <button onclick="loadDetail(${e.idMeal})" class="btn btn-outline-secondary" type="button" id="detail-btn">Detail</button>
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
    console.log(mealDetail)
    const meal = mealDetail.meals[0]
    const name = meal.strMeal;
    const instruction = meal.strInstructions;
    const img = meal.strMealThumb;
    const detailContainer = document.getElementById('detail-container');
    detailContainer.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto', 'p-3');
    // div.style.width = '18rem'

    div.innerHTML = `
        <img src="${img}" class="card-img-top img-fluid w-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${instruction}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    `

    detailContainer.appendChild(div);
}

