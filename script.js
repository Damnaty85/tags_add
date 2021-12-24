document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");
    
    const array = ['Абрикос', 'Авокадо', 'Аджика', 'Адинамода', 'Айва', 'Айран', 'Алкоголь', 'Алоэ', 'Багет', 'Бадьян', 'Базилик', 'Баклажан',
        'Балык', 'Бальзам', 'Бальзамик', 'Бамия', 'Банан', 'Барабулька', 'Баранина', 'Баранка', 'Барбарис', 'Ванилин', 'Ваниль', 'Варенье', 'Васаби',
        'Вафли', 'Глюкоза', 'Глютен', 'Говядина', 'Голубика', 'Горбуша', 'Горох', 'Гранола', 'Гребешок', 'Грейпфрут', 'Гренки', 'Грибы', 'Грудка', 'Груша',
        'Гуми', 'Гусь', 'Ерш', 'Желатин', 'Желе', 'Жир', 'Зверобой', 'Зелень', 'Земляника', 'Зерно', 'Зефир', 'Зира', 'Зубатка', 'Иваси', 'Изюм', 'Индейка',
        'Инжир', 'Ирга', 'Ириски', 'Йогурт', 'Йод', 'Йошта', 'Кабачок', 'Кактус', 'Каннеллони', 'Каперсы', 'Капучино', 'Каракатица', 'Карамбола', 'Карамель',
        'Кориандр', 'Корица', 'Корнишоны', 'Корюшка', 'Крекер', 'Крем', 'Кукуруза', 'Кэроб', 'Лаванда', 'Лаваш', 'Лазанья', 'Лайм', 'Маш', 'Мед', 'Меланж',
        'Мелисса', 'Мидии', 'Миндаль', 'Минеола', 'Минтай', 'Морковь', 'Мороженое', 'Морошка', 'Моцарелла', 'Мюсли', 'Мясо', 'Мята', 'Навага', 'Налим', 'Напиток'
    ];

    if(!localStorage.getItem('Ingredients')){
        localStorage.setItem('Ingredients', JSON.stringify(array))
    }

    function inputTemplate(listId, labelStr, inputId, inputName, helper, arrayIngredients) {
        return `
            <div class="text-field">
                <input list="${listId}" id="${inputId}" name="${inputName}" />
                <label for="${inputId}">${labelStr}</label>
                <span>${helper}</span>
                <button class="add">Добавить</button>
                ${dataListTemplate(listId, arrayIngredients)}
            </div>
        `
    }

    function dataListTemplate(listId, arrayIngredients) {
        const arrayItem = JSON.parse(localStorage.getItem(arrayIngredients))
        return `
            <datalist id="${listId}">
                ${arrayItem.map(it => `<option value="${it}"></option>`).join('')}
            </datalist>
        `
    }

    app.insertAdjacentHTML('beforeend', inputTemplate('ingridient-list', 'Выберите ингредиент', 'input', 'ingridients', 'Начните вводить слово.', 'Ingredients'))
    app.insertAdjacentHTML('afterbegin', `<p>Добавьте ингридиенты</p><label for="result-input" id="result"></label>`);
    app.insertAdjacentHTML('beforeend', `<input class="visual-hidden" id="result-input" type="text" value="">`);

    const innput = document.getElementById('input');
    const result = document.getElementById('result');
    const resultInput = document.getElementById('result-input');
    const addButton = document.querySelector("button.add")

    function insertComma(string) {
        string = string.toString();
        string = string.replace(/([а-я])([А-Я])/g, '$1, $2');
        string = string.replace(/([А-Я])([А-Я][а-я])/g, '$1, $2')
        return string;
    }

    innput.addEventListener('input', function() {
        let thisValue = this.value;
        const option = document.getElementById('ingridient-list').childNodes;

        const regexp = /(<([^>]+)>)/ig;

        for (var i = 0; i < option.length; i++) {
            if (option[i].value === thisValue) {
                const selectedOPtion = option[i].value
                this.value = "";
                if (result.textContent.length === 0) {
                    result.innerHTML = `<span>${selectedOPtion}<img src="https://img.icons8.com/material-rounded/24/000000/multiply.png"/></span>`;
                } else {
                    const prevVal = result.innerHTML;
                    if(!prevVal.replace(regexp,'').includes(selectedOPtion)) {
                        result.innerHTML = prevVal + `<span>${selectedOPtion}<img src="https://img.icons8.com/material-rounded/24/000000/multiply.png"/></span>`
                        resultInput.value = [prevVal, selectedOPtion].join(", ").replace(regexp,'')
                        resultInput.value = insertComma(resultInput.value)
                    }
                    console.log(resultInput.value)
                    result.childNodes.forEach((item) => {
                        item.querySelector("img").addEventListener('click', () => {
                            item.remove()
                        })
                    })
                }
                break;
            }
        }
    })

    addButton.addEventListener('click', function() {
        console.log("click")
    })
})