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

Eine ausführliche [Dokumentation](https://testing-library.com/docs/react-testing-library/intro/) und ein [Migrationsleitfaden](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme) beschreiben, wie enzyme-Tests mit testing-library/react umgeschrieben werden können. testing-library/react bietet eine Auswahl an [Abfragefunktionen](https://testing-library.com/docs/queries/about), die für eine benutzerorientierte Auswahl der DOM-Elemente  verwendet werden können. 

In den folgenden Beispielen werden einige Tests in enzyme und umgeschrieben in testing-library/react verglichen.

Bei der Überprüfung von HTML-Baum-Snapshots testet testing-library/react das tatsächliche native innere oder äußere HTML des Zielelements, was die tatsächliche DOM-Ausgabe besser widerspiegelt.

#### enzyme

```js
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should match snapshot', () => {
   const component = mount(<DialogComponent />);
   expect(component.html()).toMatchSnapshot();
 });
```

#### testing-library/react

```js
import { render } from '@testing-library/react';

test('should match snapshot', () => {
   const { container } = render(<DialogComponent />);
   expect(container.innerHTML.toMatchSnapshot();
 });
```



Darüber hinaus bietet die react-testing-library eine Auswahl an Abfragemethoden, um Ziel-DOM-Knoten zu finden. *getByTestId* ist besonders nützlich, da es das Auffinden von Ziel-Tags durch die Abfrage ihrer eindeutigen Test-ID präzisiert.

#### enzyme

```js
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should close Dialog on close button click.', () => {
   const wrapper = mount(<ToggleButton />);
   const component = wrapper.find(ToggleButton);
   expect(component).toBeTruthy();
 });
```

#### testing-library/react

```js
import { render } from '@testing-library/react';

test('should render toggle button', () => {
   const { getByTestId } = render(<ToggleButton />);
   const toggleBtn = getByTestId('toggle-btn');
   expect(toggleBtn).toBeTruthy();
 });
```



Eine weitere praktische Funktion in testing-library/react ist die unkomplizierte Aktualisierung von Komponenten innerhalb von Tests mit *async - await*. Dies macht es sehr einfach, auf Änderungen nach Ereignissen wie Klicks oder Eingabeänderungen zu warten.

#### enzyme

```js
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test("set state's text property on input change", () => {
   const text = 'Some text';
   const wrapper = mount(<TextInput value={text} />);
   expect(wrapper.find('TextInput').state().name)
     .toEqual(text);

   wrapper.find('textarea')
     .simulate('change', { target: { value: 'bar' } });

   expect(wrapper.find('TextInput').state().name)
     .toEqual('bar');
 });
```

#### testing-library/react

```js
import { render, screen } from '@testing-library/react';

test("set state's text property on input change", async () => {
   const text = 'Some text';
   render(<TextInput value={text} />);
   const textarea = screen.getByTestId('styler-text-area')
       .querySelector('textarea');
   expect(textarea.value).toBe(text);

   await fireEvent.change(textarea, { target: { value: 'bar' } });
   expect(textarea.value).toBe('bar');
});
```