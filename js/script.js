document.addEventListener('DOMContentLoaded', () => {
    const tabcontent = document.querySelectorAll('.tabcontent'),
        tabheader = document.querySelector('.tabheader'),
        tabheaderItem = document.querySelectorAll('.tabheader__item');
    // у меня есть
    // tabcontainer - оболочка где лежат tabheader + tabcontent
    // Задача: при клике на элемент из tabheader должна показываться соотвествующая картинка из массива tabcontent, а остальные скрываться
    // tabcontent это сама картинка (их несколько), которая должна показываться в зависимости от того, что выбрал юзер в tabheader.То есть если он выбрал рыбу, должна быть картинка с рыбой.
    // порядок картикон совпадает с порядком меню. То есть для элемента из 1 меню подходит картинка стоящая первой, для второго жлемента вторая и для 3 третья.
    // Значит нужно повесить прослушку по клику на tabheader, проверить если юзер кликнул именно по элементу меню (а не мимо) и после этого узнать его индекс.
    // Для этого мы достанем список всех элементов tabheader__item. и будем перебирать этот массив.Когда то, что накликал юзер будет равно чему-то из масива элементов tabheader__item, мы достанем актуально перебираемый индекс и таким образом узнаем каким в очереди стоит тот элемент, на который юзер кликнул.
    hideTabContent()
    showTabContent()
    tabheader.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('tabheader__item')) {
            tabheaderItem.forEach((element, index) => {
                if (element == target) {
                    hideTabContent()
                    tabheaderItem.forEach(element => element.classList.remove('tabheader__item_active'))
                    showTabContent(index)
                    tabheaderItem[index].classList.add('tabheader__item_active')
                }
            })
        }
    })

    function hideTabContent() {
        tabcontent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade')
        })
    }
    function showTabContent(index = 0) {
        tabcontent[index].classList.add('show', 'fade');
        tabcontent[index].classList.remove('hide')
    }

    const modalTrigger = document.querySelector('.btn_white'),
        modal = document.querySelector('.modal');

    function showModal() {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide')
    }

    function hideModal() {
        modal.classList.remove('show', 'fade');
        modal.classList.add('hide');
    }

    modalTrigger.addEventListener('click', () => {
        showModal()
    })

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('modal') || target.classList.contains('modal__close')) {
            hideModal()
        }
    })

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('submit пойман!');

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch('http://localhost:3000/forms', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(result => console.log('Ответ сервера:', result))
                .catch(err => console.error(err));
        });
    });

    // forms.forEach(form => {
    //     form.addEventListener('submit', (event) => {
    //         event.preventDefault();
    //         console.log('submit')
    //         const formData = new FormData(form);
    //         const data = Object.fromEntries(formData.entries());

    //         fetch('http://localhost:3000/forms', {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(response => response.json())
    //             .then(result => {
    //                 console.log('Ответ сервера:', result);
    //             })
    //             .catch(error => {
    //                 console.error('Ошибка:', error);
    //             });
    //     })
    // })


})