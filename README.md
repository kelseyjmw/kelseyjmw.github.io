# OakDB

## Additional Details

**Application Name and Description**
- **Name**: OakDB
- **Description**: This application provides a user interface to search for information about Pokemon. OakDB allows the user to view all Pokemon, search for a specific Pokemon, filter Pokemon by one or more types, favorite Pokemon, and view detailed information about Pokemon.

**Pages**
- index.html
- favorites.html
- details.html

**Steps to Set up and run the application**
<br>
Open the home page, index.html in the browser. From here the user will be able to navigate to all other pages.

**Features Implemented**
<br>
index.html:
- All Pokemon are visible by default with options to view "Full Details" and "Favorite" the Pokemon by clicking their respective buttons on the Pokemon's card. Selecting the "See More" button at the end of the visible list of Pokemon will perform a pagination and render more Pokemon to be viewed.
- The user may search for a specific Pokemon by entering the Pokemon's name or id in the search box then clicking the "Search" button.
- The user may filter pokemon by one or more type selecting the type checkboxes then clicking the "Search" button.

favorites.html:
- The Pokemon which have been selected by the user on index.html will have their cards displayed here.
- The user can view the Pokemon's detailed information by selecting "Full Details" on the Pokemon's card.
- The user may remove a Pokemon from the favorite's list by clicking the "Favorite" button again. Refreshing this page will remove
the Pokemon from the list.

details.html:
- Detailed information for the selected Pokemon will be displayed here. This page renders information dynamically based on the selected Pokemon.
- Select options from the mini-navigation: "General", "Base Stats", "Evolution Line".
- Selecting one of the above options will render their respective information for this Pokemon.
- Selecting "Evolution Line" will show this Pokemon's evolution line sprites and names, and buttons to access the Pokemon's full details page.
- Under the "Moves" section, the user may select the game version they would like to view this Pokemon's moves for from the "Select Version" dropdown menu.
- Selecting an option in the "Select Version" dropdown menu will render only the moves learned by this Pokemon in that version. This information is categorized by "Name", "Level Learned", and "Method" (the method this Pokemon uses to learn that move).

**APIs used**
<br>
PokeAPI: https://pokeapi.co/api/v2/
I have used various endpoints from this API to get information for the Pokemon.

## Citations & Acknowledgements

<br>[1] Remixicon Open Source Icons. https://remixicon.com/. Accessed 17 Jan. 2025.
<br>[2] Bootstrap Documentation. https://getbootstrap.com/docs/5.3/getting-started/introduction/. Accessed 17 Jan. 2025.
<br>[3] OakDB Logo by Kelsey White. Jan 18. 2025.
<br>[4] PokeAPI. https://pokeapi.co/. Accessed 18 Jan. 2025.
<br>[5] Javascript Array.filter() Documentation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter Accessed 25 Jan. 2025.
<br>[6] Javascript Array.from() Documentation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from Accessed 25 Jan. 2025.
<br>[7] Javascript Array.map() Documentation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map Accessed 25 Jan. 2025.
<br>[8] Javascript Promise.all() Documentation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all Accessed 26 Jan. 2025.
<br>[9] Javascript Pagination. James Q Quick. https://www.youtube.com/watch?v=Ynp6Gdd3XVE. Accessed Jan 25 2025.
