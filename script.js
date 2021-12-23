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

            localStorage.setItem('Ingredients', JSON.stringify(array))

            function inputTemplate(listId, labelStr, inputId, inputName) {
                return `<label for="${inputId}">${labelStr}</label>
                <input list="${listId}" id="${inputId}" name="${inputName}" />`
            }

            function dataListTemplate(listId, arrayIngredients) {
                const arrayItem = JSON.parse(localStorage.getItem(arrayIngredients))
                return `<datalist id="${listId}">
                    ${arrayItem.map(it => `<option value="${it}"></option>`).join('')}
                </datalist>`
    }

    app.insertAdjacentHTML('beforeend', inputTemplate('ingridient-list', 'Начните вводить слово.<br> Выберите ингредиент', 'input', 'ingridients'))
    app.insertAdjacentHTML('beforeend', dataListTemplate('ingridient-list', 'Ingredients'))
    app.insertAdjacentHTML('afterbegin', `<p>Добавьте ингридиенты</p><label for="result-input" id="result"></label>`);
    app.insertAdjacentHTML('beforeend', `<input class="visual-hidden" id="result-input" type="text" value="">`);

    const innput = document.getElementById('input');

    innput.addEventListener('input', function() {
        let thisValue = this.value;
        const option = document.getElementById('ingridient-list').childNodes;

        const result = document.getElementById('result');
        const resultInput = document.getElementById('result-input');

        const regexp = /(<([^>]+)>)/ig;
        // .replace(/([a-z])([A-Z])/g, '$1, $2') находит строчную за которой следует главная и ставить ,

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
})