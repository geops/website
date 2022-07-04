---
title: Umstellung von enzyme auf testing-library/react
summary: Unit-Tests in geOps-Anwendungen wurden bisher von der veralteten
  Bibliothek enzyme durchgeführt. Diese Tests wurden nun mit
  testing-library/react neu geschrieben. Dieser Artikel bietet einen kurzen
  Überblick über die Aktualisierungen.
created: 2022-07-04
slug: umstellung-enzyme-react-testing-library
published: true
---
Im Dezember 2021 gaben die Entwickler der sehr beliebten Unit-Testing-Bibliothek für React-Komponenten [enzyme](https://enzymejs.github.io/enzyme/) bekannt, dass sie die Entwicklung des Pakets einstellen werden. Wie in diesem [Artikel](https://dev.to/wojtekmaj/enzyme-is-dead-now-what-ekl) auf dev.to erwähnt, führte React 18 zu viele bahnbrechende Änderungen ein und die Entwicklung einer kompatiblen Enzyme-Version bedeutete eine riesige, nicht durchführbare Überarbeitung des Pakets.

Da viele geOps-Anwendungen auf Enzyme für Unit-Tests angewiesen waren, musste eine alternative Lösung für Unit-Tests gefunden werden, um in Zukunft auf React 18 upgraden zu können. Glücklicherweise gibt es eine alternative Bibliothek, die auch offiziell von den React-Entwicklern empfohlen wird: [testing-library/react](https://testing-library.com/react).

Zunächst einmal ist es wichtig, einen wesentlichen Unterschied zwischen den beiden Bibliotheken zu benennen. Abgesehen von den DOM-Testmethoden bietet enzyme Test-Utilities, die auf den Komponentenzustand zugreifen und das Testen von Komponenten basierend auf ihren internen APIs ermöglichen. Stattdessen konzentriert sich testing-library/react nur auf das Testen der eigentlichen DOM-Elemente. Die Entwickler argumentieren, dass dieser Ansatz benutzerorientierter ist, da das DOM die endgültige Ausgabe ist, mit der der Benutzer tatsächlich interagiert. Dieser Ansatz vermeidet auch, dass der Test nach strukturellen Änderungen, die keinen Einfluss auf die Funktion der Komponente und die DOM-Ausgabe haben, angepasst werden muss, was sehr zeitaufwändig sein kann.

Eine ausführliche [Dokumentation](https://testing-library.com/docs/react-testing-library/intro/) und ein [Migrationsleitfaden](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme) beschreiben, wie enzyme-Tests mit testing-library/react umgeschrieben werden können. testing-library/react bietet eine Auswahl an [Abfragefunktionen](https://testing-library.com/docs/queries/about), die für eine benutzerorientierte Auswahl der DOM-Elemente  verwendet werden können. Die folgenden Beispiele zeigen denselben Test in Enzyme und in testing-library/react.


enzyme:

```js
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import DialogComponent from './DialogComponent';

configure({ adapter: new Adapter() });

describe('DialogComponent', () => {
 const mockStore = configureStore([thunk]);
 let store;

 beforeEach(() => {
   store = mockStore({
     app: { dialogOpen: true },
   });
 });

 test('should close Dialog on close button click.', () => {
   const wrapper = mount(
     <Provider store={store}>
       <DialogComponent />
     </Provider>,
   );
   const component = wrapper.find('DialogComponent');
   const closeBtn = component.find('.component-class').find('Button').at(1);
   closeBtn.simulate('click');

   expect(store.getActions()).toEqual([
     { data: false, type: 'SET_DIALOG_OPEN' },
   ]);
 });

 test('should match snapshot', () => {
   const component = mount(
     <Provider store={store}>
       <DialogComponent />
     </Provider>,
   );
   expect(component.html()).toMatchSnapshot();
 });
});
```

testing-library/react:

```js
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import DialogComponent from './DialogComponent';

describe('DialogComponent', () => {
 const mockStore = configureStore([thunk]);
 let store;

 beforeEach(() => {
   store = mockStore({
     app: { dialogOpen: true },
   });
 });

 test('should close Dialog on close button click.', async () => {
   expect(store.getActions()).toEqual([]);
   expect(store.getState().app.dialogOpen).toBe(true);
   render(
     <Provider store={store}>
       <DialogComponent />
     </Provider>,
   );
   const closeBtn = screen
     .getByTestId('dialog-testid')
     .querySelectorAll('.component-class button')[1];
   await fireEvent.click(closeBtn);

   expect(store.getActions()).toEqual([
     { data: false, type: 'SET_DIALOG_OPEN' },
   ]);
 });

 test('should match snapshot', () => {
   const { getByTestId } = render(
     <Provider store={store}>
       <DialogComponent />
     </Provider>,
   );
   expect(getByTestId('dialog-testid').outerHTML).toMatchSnapshot();
 });
});
```