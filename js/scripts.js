
let SN = {};
let Render;
let DataSet;

class Model {
    dataSet() {
        //This is a place holder where we can fetch the data From API
        return [
            {value: 1, color: '#'},
            {value: 2, color: '#'},
            {value: 3, color: '#'},
            {value: 4, color: '#'},
            {value: 5, color: '#'},
            {value: 6, color: '#'},
            {value: 7, color: '#'},
            {value: 8, color: '#'},
            {value: 9, color: '#'}
        ];
    }
}

class Renderer {
    constructor(dataList) {
        this._datList = dataList;
    }

    get dataList() {
        return this._datList;
    }

    sortHandler(data) {
        //this can handle all possible data type
        function sortCallback(property) {
            const sortOrder = 1;
            return function (a, b) {
                if (a[property] < b[property]) {
                        return -1 * sortOrder;
                } else if (a[property] > b[property]) {
                        return 1 * sortOrder;
                } else {
                        return 0 * sortOrder;
                }
            }
        }
        data.sort(sortCallback('value'));
        return data;
    }

    //create dom element in sorted manner
    buildDomElement() {
        let element = document.createDocumentFragment();
        let ulElement = document.createElement('ul');
        ulElement.setAttribute("id", "list-container");
        let data = this.sortHandler(this._datList);
        data.forEach((item) => {
            let liElement = document.createElement('li');
            liElement.textContent = item.value;
            liElement.classList.add('flex-item');
            liElement.classList.add('list-item');
            element.appendChild(liElement);
        });
        ulElement.appendChild(element);
        ulElement.classList.add('flex-container');
        let domElement = document.getElementById("card-list");
        domElement.appendChild(ulElement);
    }

}

//using IIFE to load the DOM element
SN.CustomData = (async function () {
    DataSet = new Model();
    let dataList = DataSet.dataSet();
    Render = new Renderer(dataList);
    await Render.buildDomElement();
    document.getElementById('suffle').addEventListener('click', arrangeItemHandler);
    document.getElementById('sort').addEventListener('click', arrangeItemHandler);
})();

function arrangeItemHandler(event) {
    let items = Array.prototype.slice.call(document.querySelectorAll('.list-item'));
    if (event.target.id === 'suffle') {
        items.sort(() => Math.random() - 0.5);
    } else {
        items.sort(function(a,b) {
            return b.textContent - a.textContent;
        });
    }
    items.forEach((item, idx) => {
        if (idx>0)
            item.parentNode.insertBefore(item, items[idx-1]);
    });
}

