Goal of this task is to create a reusable list component with three different types of data and items. Data structure is available in endpoints:

* `/users` - returns flat array of all users.

* `/payments` - returns flat array of all payments

* `/countries` - returns flat array of all countries


Application at main page should allow to navigate to three views `users` `payments` and `countries` and see three lists.

* Lists should be able to share common functionalities like selecting items, searching etc.

* Lists should be able to share common styles.

* Lists should be able to display different items for different data types.

* It should be possible to easily add new data type and create another list.
clear
Bonus features:

* It should be possible to search item and filter list. In case of payments, we should be able to search by type, there's no need to search by specific payment fields.

* Add item details view with single list item.
    * `/users/:id` - returns single user
    * `/countries/:id` - returns single country

* Handle empty dataset.

* Show spinner when there is waiting period for API response.

* Some example unit tests.


What we pay attention to:

* General structure of application, components, etc.

* Strict usage of Typescript. Using setting `compilerOptions -> strict: true` in `tsconfig.json` is a plus.

* Performance - component should run smoothly. Number of values to pick is around 10k, single node may have 1k children.

* API usage - calls should be limited to minimum.

* Using standalone architecture, avoiding ngModules


We advise to use Angular Material as UI library to minimize effort in layout styling. It does not have to be pixel perfect, wireframe is just a suggestion.

API with data should be run locally using json-server https://www.npmjs.com/package/json-server

Please fork the project to your own bitbucket, github, or other git hosting account, and give us access to the repository holding your solution.
