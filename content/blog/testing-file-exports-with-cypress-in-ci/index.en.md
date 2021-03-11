---
title: Testing file exports with Cypress in CI
summary: Today we will talk about Cypress. More specifically, how to test Canvas
  exports in an End-To-End (E2E) testing scenario and how to integrate the tests
  into your CI.
author: "Daniel Marsh-Hunn "
cover: /images/blog/testing-file-exports-with-cypress-in-ci/cypress – 4.png
created: 2020-10-24
slug: testing-file-exports-with-cypress-in-ci
tags:
  - developers
published: true
---
Today we will talk about Cypress. More specifically, how to test Canvas exports in an End-To-End (E2E) testing scenario and how to integrate the tests into your CI.

geOps web apps frequently have features that export a map canvas as an image. [mapset](https://editor.mapset.ch/) is one of these, enabling users to draw situational maps for the public transport domain and exporting them as PNG-files. As one of mapset’s more complex but essential functionalities, it’s also prone to errors as the app evolves. It’s workflow needs to be tested by replicating real user scenarios in E2E-tests.

[](https://www.cypress.io/)Cypress has become a top choice for E2E tests in web development, especially for react apps. It provides a testing interface to programmatically simulate user interactions (e.g. a sequence of clicks or other events) and launch the test in a web browser instance using headed ([cypress open](https://docs.cypress.io/guides/guides/command-line.html#cypress-open)) or headless ([cypress run](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)) mode. Headed mode provides a more human-readable testing interface, allowing developers to watch the testing workflow in a browser instance in a controlled Cypress environment. Headless mode runs the tests in the terminal only.

Our user scenario is as follows:

*   User loads mapset and logs in
*   A previously drawn plan is imported into the map
*   User triggers a canvas export
*   The exported PNG file should include the basemap and the features from the imported drawing

![](/images/blog/testing-file-exports-with-cypress-in-ci/image1.png)

To replicate this behaviour, we programmatically launch and log into mapset, trigger a click on the Canvas Export Button and and check if the downloaded file is identical to a prepared comparison file.

We first launch mapset within Cypress using the [start-server-and-test](https://github.com/bahmutov/start-server-and-test) package to start a development server and run Cypress in headless mode:

`npm run start-server-and-test start http://localhost:3000 'cypress run --headless --browser chromium'`

Or for yarn users:

`yarn start-server-and-test start http://localhost:3000 'cypress run --headless --browser chromium'`

We then log into mapset using a [custom command](https://docs.cypress.io/api/cypress-api/custom-commands.html). The custom command code depends on the app login process. In our case we run a GET [request()](https://docs.cypress.io/api/commands/request.html) to the login endpoint and extract a [CSRF token](https://portswigger.net/web-security/csrf/tokens), which we then add to the body in a POST request to the login endpoint along with an email and a password. The email and password values are passed into Cypress in gitlab as environment variables. Note that Cypress environment variables need to be capitalised.

The resulting code looks something like this:

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_01.png)

Next, in our test we need to [visit()](https://docs.cypress.io/api/commands/visit.html) mapset and load a plan into the map. In interactive mode mapset launches a GET request to an API in the backend, fetching a KML file on success and loading it into the map. Obviously, we want to avoid this behaviour in the tests in order to make them backend-independent. Luckily Cypress allows us to [stub](https://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html#Stubshttps://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html#Stubs) request responses. This way we can define preset [fixtures](https://docs.cypress.io/api/commands/fixture.html) to be returned from requests to drawing API in every test.

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_02.png)

Having loaded the plan correctly into mapset we now trigger a [click()](https://docs.cypress.io/api/commands/click.html) on the Canvas Export button. And this is where the tricky part begins: By default headless browser instances do not allow downloads, which prevents us from using the downloaded PNG for comparison. As a workaround we applied a solution presented in this [github issue](https://github.com/cypress-io/cypress/issues/949#issuecomment-666638986). In summary, it defines custom [Cypress plugins](https://docs.cypress.io/api/plugins/writing-a-plugin.html) that pass arguments to the headless chromium browser instance on launch, allowing us to call [Browser.setDownloadBehavior](https://vanilla.aslushnikov.com/?Browser.setDownloadBehavior) with ‘allow’ and specify the path to the desired download folder.

So far so good. We now need to compare the downloaded PNG to a prepared fixture PNG, which needs to be identical. Unfortunately Cypress [wait()](https://docs.cypress.io/api/commands/wait.html) doesn’t support waiting on events like file downloads, so we use it with a fixed timeout to make sure the file download is complete. We then use [readFile()](https://docs.cypress.io/api/commands/readfile.html) to read the file using base64-encoding and compare our files.

In our test we then use the custom task to compare the files.

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_03.png)

And voilá! Our tests run and pass in headless mode.

To run the Cypress tests in our gitlab-CI pipeline, we add a test stage in the .gitlab-ci.yml file. Here we make sure all Cypress requirements and assets are present, Cypress is installed and the tests are run. As mentioned previously, the mapset login credentials are passed in using [gitlab environment variables.](https://docs.gitlab.com/ee/ci/variables/)

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_04.png)

To our great dismay our pipeline still kept failing during the Cypress test stage, since our tests were causing the chrome instance to freeze. After some serious investigation and a lot of coffee, we did find the culprit: our pipelines run in Docker containers with a default shared memory space limit, which may be too small for handling large web contents in chrome. We solved this by adding `--disable-dev-shm-usage` to the chrome launch options to remove the bottleneck, as recommended by Google (check out the [Google documentation](https://developers.google.com/web/tools/puppeteer/troubleshooting#tips)).

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_05.png)

And now we sit back, grab some popcorn and watch the pipeline run through the tests smoothly.

That’s all for today. We hope our efforts help you in your own Cypress test automation. Happy coding!