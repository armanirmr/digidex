# DigiDex
This React application, named DigiDex, is designed to allow users to explore information about Digimons (Digital Monsters) using the [Digi API](https://digimon-api.com/). The app provides a user-friendly interface for searching and viewing details about different Digimons, including their names, images, types, attributes, and descriptions.

## Features
Search Functionality: Users can search for Digimons by name using the search input field. The application leverages Axios to fetch data from the Digi API in response to user queries.

Pagination: The app supports pagination, allowing users to navigate through multiple pages of Digimons. Users can move to the previous or next page, and the number of Digimons displayed per page is customizable.

Dynamic Loading: The app dynamically loads Digimons based on the user's search query and the selected pagination options. It optimizes the number of API requests made to efficiently retrieve the required data.

Dropdown for Digimons Per Page: Users can customize the number of Digimons displayed per page through a dropdown menu. This enhances user flexibility and experience.

## Implementation Details
- Debouncing Search Input: The application uses the lodash debounce function to debounce the search input, preventing excessive API requests during rapid typing.

- Loading Indicator: A loading indicator is displayed when data is being fetched from the API, providing feedback to users about the ongoing process.

- Error Handling: The app includes error handling mechanisms to manage potential issues during data retrieval. Any errors encountered during the API request are logged to the console.

- Responsive Design: The user interface is designed to be responsive, ensuring a consistent experience across various devices and screen sizes.

## How to Use
[Visit the app](https://armanirmr.github.io/digidex/)
1. Enter the name of a Digimon in the search input field.
2. Optionally, customize the number of Digimons displayed per page using the dropdown menu.
3. Explore details about the retrieved Digimons, including images, types, attributes, and descriptions.
4. Navigate through multiple pages using the pagination buttons.

Feel free to deploy this application and explore the fascinating world of Digimons!
