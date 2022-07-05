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

A detailed [documentation](https://testing-library.com/docs/react-testing-library/intro/) and [migration guide](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme) describe how to rewrite enzyme tests with testing-library/react. testing-library/react provides a selection of [query functions](https://testing-library.com/docs/queries/about) that can be used to select DOM elements just like the user would do it. 

The following examples compare some tests in enzyme and rewritten in testing-library/react.



### **Snapshots**

When checking HTML tree snapshots, the testing-library/react approach tests the native inner or outer HTML of the target element, better reflecting the actual DOM output.

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

### **Query selectors**

Furthermore, react-testing-library provides a selection of query methods to find target DOM nodes. *getByTestId* is particularly useful, since it makes pinpointing target tags precise by querying their unique test id.

#### enzyme

```js
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should close Dialog on close button click.', () => {
   const wrapper = mount(<ToggleButton />);
   const component = wrapper.find('ToggleButton');
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

### **Events**

Another convenient feature in testing-library/react is the straightforward component updating within tests using *async - await*. This makes it very easy to await changes after events such as clicks or input changes.

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
import { render, screen, fireEvent } from '@testing-library/react';

test("set state's text property on input change", async () => {
   const text = 'Some text';
   render(<TextInput value={text} />);
   const textarea = screen.getByTestId('text-area')
       .querySelector('textarea');
   expect(textarea.value).toBe(text);

   await fireEvent.change(textarea, { target: { value: 'bar' } });
   expect(textarea.value).toBe('bar');
});
```