---
title: Migrating from enzyme to testing-library/react
summary: Unit testing in geOps applications was previously handled by the
  deprecated library enzyme. These tests have now been rewritten with
  testing-library/react. This article provides a quick overview of the updates.
author: Daniel Marsh-Hunn
cover: /images/blog/migrating-from-enzyme-to-testing-library-react/testing-library.png
created: 2022-07-04
slug: migration-enzyme-react-testing-library
tags:
  - developers
published: true
---
In December 2021 the developers for the very popular unit-testing library for React components [enzyme](https://enzymejs.github.io/enzyme/) announced they were discontinuing the development of the package. As mentioned in this [article](https://dev.to/wojtekmaj/enzyme-is-dead-now-what-ekl) on dev.to, React 18 introduced too many breaking changes and developing a compatible enzyme version meant a huge, unfeasible rework of the package.

Since many geOps applications relied on enzyme for unit testing, its deprecation meant finding an alternative testing solution in order to be able to upgrade to React 18 in the future. Fortunately, there is an alternative library, which is also officially recommended by the React developers: [testing-library/react](https://testing-library.com/react). 

First of all, it is important to specify a major difference between the two libraries. Apart from DOM testing methods, enzyme provides testing utilities accessing the component state, allowing component testing based on their internal APIs. Instead, testing-library/react focuses only on testing the actual DOM nodes. The developers argue that this approach is more user-centred, since the DOM is the final output the user actually interacts with. This approach also avoids having to adapt the test after structural changes with no influence on the component’s function and DOM output, which can be very time consuming.

A detailed [documentation](https://testing-library.com/docs/react-testing-library/intro/) and [migration guide](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme) describe how to rewrite enzyme tests with testing-library/react. testing-library/react provides a selection of [query functions](https://testing-library.com/docs/queries/about) that can be used to select DOM elements just like the user would do it. The following examples show the same test in written enzyme and in rewritten in testing-library/react.


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

   expect(store.getActions()[0]).toEqual({
     data: undefined,
     type: 'SET_DIALOG_CLOSED',
   });
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