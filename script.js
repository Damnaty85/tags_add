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

    const arrayMenu = ['Основное меню', 'Вторые блюда', 'Выпечка', 'Гарниры', 'Закуски', 'Кондитерские изделия', 'Напитки', 'Постное', 'Салаты', 'Супы']

    if(!localStorage.getItem('Ingredients')){
        localStorage.setItem('Ingredients', JSON.stringify(array))
    }

    const arrayItem = JSON.parse(localStorage.getItem('Ingredients'))

    function fieldSetTemplate([...rest], selector = 'fieldset') {
        return `
            ${[...rest].map(it => `<div class="${selector}"></div>`).join("")}
        `
    }

    function spanTemplate(title) {
        return `<span>${title}<img src="https://img.icons8.com/material-rounded/24/3d4752/multiply.png" onclick="this.parentNode.remove()"/></span>`
    }

    function inputTemplate(placeholder, helper, listId, inputId, inputName, arrayIngredients, isAdd = true) {
        return `
            <div class="text-field">
                <input list="${listId}" id="${inputId}" name="${inputName}" class="data-list__input"/>
                <label for="${inputId}">${placeholder}</label>
                <span>${helper}</span>
                ${isAdd === true ? `<button class="add">Добавить</button>` : ''}
                ${dataListTemplate(listId, arrayIngredients)}
            </div>
        `
    }

    function dataListTemplate(listId, arrayIngredients) {
        return `
            <datalist id="${listId}">
                ${arrayIngredients.map(it => `<option value="${it}"></option>`).join('')}
            </datalist>
        `
    }

    function resultTemplate(title, inputId, name) {
        return `
            <p>${title}</p><label for="${inputId}" class="result"></label>
            <input class="visual-hidden result-input" id="${inputId}" name="${name}" type="text" value="">
        `
    }

    app.insertAdjacentHTML('beforeend', fieldSetTemplate([array, arrayMenu]))

    const fieldSets = document.querySelectorAll('.fieldset')

    fieldSets[0].insertAdjacentHTML('beforeend', inputTemplate('Выберите ингредиент', 'Начните вводить слово.', 'ingridient-list', 'input-ingridient', 'ingridients', arrayItem))
    fieldSets[0].insertAdjacentHTML('afterbegin', resultTemplate('Добавьте ингридиенты', 'result', 'ingridients'));

    fieldSets[1].insertAdjacentHTML('beforeend', inputTemplate('Выберите меню', 'Начните вводить слово.', 'menu-list', 'input-menu', 'menu', arrayMenu, false))
    fieldSets[1].insertAdjacentHTML('afterbegin', resultTemplate('Добавьте меню', 'result', 'menu'));

    function insertComma(string) {
        string = string.toString();
        string = string.replace(/([а-я])([А-Я])/g, '$1, $2');
        string = string.replace(/([А-Я])([А-Я][а-я])/g, '$1, $2')
        return string;
    }

    fieldSets.forEach((it) => {
        const input = it.querySelector('.data-list__input');
        input.addEventListener('input', function() {
            let thisValue = this.value;
            const options = it.querySelector('datalist').childNodes;
            const result = it.querySelector('.result');
            const resultInput = it.querySelector('.result-input');
        
            const regexp = /(<([^>]+)>)/ig;
        
            for (var i = 0; i < options.length; i++) {
                if (options[i].value === thisValue) {
                    const selectedOption = options[i].value
                    this.value = "";
                    if (result.textContent.length === 0) {
                            result.innerHTML = spanTemplate(selectedOption);
                        } else {
                            const prevVal = result.innerHTML;
    
                            if(!prevVal.replace(regexp,'').includes(selectedOption)) {
                                result.innerHTML = prevVal + spanTemplate(selectedOption)
                                resultInput.value = [prevVal, selectedOption].join(", ").replace(regexp,'')
                                resultInput.value = insertComma(resultInput.value)
                            }
                        }
                    break;
                }
            }
        })

        if(it.querySelector("button.add")) {
            const addButton = it.querySelector("button.add")

            addButton.addEventListener('click', function() {
                let currentValue = input.value;
                let currentArray = JSON.parse(localStorage.getItem('Ingredients'))
                if (currentValue !== "") {
                    currentArray.push(currentValue)
                        console.log(currentArray)
                        localStorage.setItem('Ingredients', JSON.stringify(currentArray))
                    
                }
                
                input.value = ""
            })
        }
    })
})