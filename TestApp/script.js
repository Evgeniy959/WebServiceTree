        let apiBaseUrl = "https://localhost:7078/api";
        // Получение всей электроники
        async function getAll() {
            // отправляет запрос и получаем ответ
            const response = await fetch(apiBaseUrl+"/Electronics", {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                const electronics = await response.json();
                const rows = document.querySelector("tbody");
                // добавляем полученные элементы в таблицу
                electronics.forEach(el => rows.append(row(el)));
            }
        }
        // Получение одного элемента электроники
        async function getElem(id) {
            const response = await fetch(apiBaseUrl+`/Electronics/${id}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                const electronics = await response.json();
                document.getElementById("elId").value = electronics.Id;
                document.getElementById("elName").value = electronics.Id;
                document.getElementById("elParent").value = electronics.Parent;
                document.getElementById("elOrder").value = electronics.Order;
            }
            else {
                // если произошла ошибка, получаем сообщение об ошибке
                const error = await response.json();
                console.log(error.message); // и выводим его на консоль
            }
        }
        // Добавление электроники
        async function create(elName, elParent, elOrder) {

            const response = await fetch(apiBaseUrl+"/Electronics", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    Id: elName,
                    Parent: elParent,
                    Order: elOrder
                })
            });
            if (response.ok === true) {
                const electronics = await response.json();
                document.querySelector("tbody").append(row(electronics));
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }
        // Изменение электроники
        async function edit(elName, elParent, elOrder) {
            const response = await fetch(apiBaseUrl+`/Electronics/${elName}`, {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    Id: elName,
                    Parent: elParent,
                    Order: elOrder
                })
            });
            if (response.ok === true) {
                const electronics = await response.json();
                document.querySelector(`tr[data-rowid='${electronics.Id}']`).replaceWith(row(electronics));
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }
        // Удаление электроники
        async function deleteElem(id) {
            const response = await fetch(apiBaseUrl+`/Electronics/${id}`, {
                method: "DELETE",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                const electronics = await response.json();
                document.querySelector(`tr[data-rowid='${electronics.Id}']`).remove();
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }

        // Удаление всей электроники даной категории
        async function deleteAll(id) {
            const response = await fetch(apiBaseUrl+`/Electronics/all/${id}`, {
                method: "DELETE",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                //const electronics = await response.json();
                document.querySelector('table tbody').innerHTML = '';
                getAll();
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }

        // сброс данных формы после отправки
        function reset() {
            document.getElementById("elId").value =
                document.getElementById("elName").value =
                document.getElementById("elParent").value =
                document.getElementById("elOrder").value = "";
        }
        // создание строки для таблицы
        function row(electronics) {

            const tr = document.createElement("tr");
            tr.setAttribute("data-rowid", electronics.Id);

            const nameTd = document.createElement("td");
            nameTd.append(electronics.Id);
            tr.append(nameTd);

            const ParentTd = document.createElement("td");
            ParentTd.append(electronics.Parent);
            tr.append(ParentTd);
            const OrderTd = document.createElement("td");
            OrderTd.append(electronics.Order);
            tr.append(OrderTd);

            const linksTd = document.createElement("td");

            const editLink = document.createElement("button");
            editLink.className = "btn btn-info"
            editLink.append("Изменить");
            editLink.addEventListener("click", async () => await getElem(electronics.Id));
            linksTd.append(editLink);

            const removeLink = document.createElement("button");
            removeLink.className = "btn btn-secondary";
            removeLink.append("Удалить");
            removeLink.addEventListener("click", async () => await deleteElem(electronics.Id));
            linksTd.append(removeLink);

            const removeAllLink = document.createElement("button");
            removeAllLink.className = "btn btn-danger";
            removeAllLink.append("Удалить все");
            removeAllLink.addEventListener("click", async () => await deleteAll(electronics.Id));
            linksTd.append(removeAllLink);

            tr.appendChild(linksTd);

            return tr;
        }
        // сброс значений формы
        document.getElementById("resetBtn").addEventListener("click", () => reset());

        // отправка формы
        document.getElementById("saveBtn").addEventListener("click", async () => {

            const id = document.getElementById("elId").value;
            const name = document.getElementById("elName").value;
            const parent = document.getElementById("elParent").value;
            const order = document.getElementById("elOrder").value;
            if (id === "")
                await create(name, parent, order);
            else
                await edit(name, parent, order);
            reset();
        });

        // загрузка списка электроники
        getAll();
        console.log("hello js")