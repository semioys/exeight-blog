---
title: Как обнаружить изменения в классах DOM элементов с помощью MutationObserver
metaTitle: Как обнаружить изменения в классах DOM элементов с помощью MutationObserver
metaDesc: MutationObserver — удобный инструмент на случай, если вы захотите
  прослушать изменения, происходящие с элементом DOM
socialImage: /images/2020-07-12_21-08.png
date: 2020-07-12T18:08:10.710Z
tags:
  - javascript
---
**[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)** — удобный инструмент на случай, если вы захотите прослушать изменения, происходящие с элементом [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). Если вы хотите написать логику, когда определенный класс добавляется или удаляется из  DOM элемента, фрагменты кода ниже будут полезны.

Начните с захвата элемента, за изменениями класса которого вы хотите наблюдать.

```javascript
const elemToObserve = document.getElementById('your_elem_id');
```

Затем сохраните флаг того, находится ли определенный класс в classList элемента как предыдущее состояние класса.

```javascript
const prevClassState = elemToObserve.classList.contains('your_class');
```

Далее, с помощью конструктора [`MutationObserver()`](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver/MutationObserver), создадим новый обьект `MutationObserver`, который вызовет функцию обратного вызова при изменении в DOM.

Обзёрвер вызывает данную функцию с двумя аргументами. Первым аргументом является массив объектов [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord), вторым аргументом является экземпляр `MutationObserver.` С помощью метода массива [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) мы можем выполнить определённые инструкции для каждой мутации.

```javascript
const observer = new MutationObserver(
  function(mutations, _observer) {
    mutations.forEach(function(mutation) {
      // Сделать что-либо.
    });
});
```

Далее, мы проверяем, совпадают ли предыдущее состояние класса и текущее состояние класса (флаг того, находится ли конкретный класс в `classList` элемента прямо сейчас). Если нет, мы обновляем предыдущее состояние.

Если текущее состояние класса истинно, то искомый класс был добавлен к элементу, а если ложно, то класс был удален.

```javascript
const observer = new MutationObserver(
  function(mutations, _observer) {
    mutations.forEach(function(mutation) {
      if(mutation.attributeName == "class"){
        const currentClassState = mutation.target.classList.contains('your_class');
        if(prevClassState !== currentClassState)    {
          prevClassState = currentClassState;
          if(currentClassState)
            console.log("Класс добавлен!");
          else
            console.log("Класс удалён!");
        }
      }
    });
});
```

Наконец, мы вызываем метод [`observe()`](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver/observe), который подписывает экземпляр `MutationObserver` на получение уведомлений о манипуляциях с DOM-элементом

```javascript
observer.observe(elemToObserve, {attributes: true});
```

Итоговый код:

```javascript
const elemToObserve = document.getElementById('your_elem_id');
const prevClassState = elemToObserve.classList.contains('your_class');
const observer = new MutationObserver(
  function(mutations) {
    mutations.forEach(function(mutation) {
      if(mutation.attributeName == "class"){
        const currentClassState = mutation.target.classList.contains('your_class');
        if(prevClassState !== currentClassState)    {
          prevClassState = currentClassState;
          if(currentClassState)
            console.log("class added!");
          else
            console.log("class removed!");
        }
      }
  });
});
observer.observe(elemToObserve, {attributes: true});
```

Больше статей на тему:

1. [MutationObserver: наблюдатель за изменениями](https://learn.javascript.ru/mutation-observer)
2. [Getting To Know The MutationObserver API](https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/)
3. [MutationObserver API](https://davidwalsh.name/mutationobserver-api)