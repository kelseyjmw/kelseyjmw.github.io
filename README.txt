## Introduction

CSCI 1170 Intro to Web Development | Assignment 3
Author: Kelsey White, B00920596

This folder contains the necessary files for my website. This webpage was creates using HTML,
CSS, and Javascript. This is designed to be good structure which I could build upon in the future
to make a personalized online portfolio once I have more work to showcase. I used pictures and videos
from my Animal Crossing New Horizons island for the theme of this website in place of future professional
work.

I have partially reused some code from Assignment 2. The HTML code is relatively similar, and CSS styles are similar, but
I have rewritten my entire stylesheet to better incorporate mobile.


## List of Assets:
The following assets have been borrowed by others:

Images:

Freepik
[1] Bodhi Leaf Free Icons. (n.d). Retrieved March 9, 2023 from https://www.flaticon.com/free-icon/bodhi-leaf_9219235?related_id=9219235

Alexander Kahlkopf
[2] Twitter 4. (n.d). Retrieved March 9, 2023 from https://iconmonstr.com/twitter-4-svg/
[3] Instagram 14. (n.d). Retrieved March 9, 2023 from https://iconmonstr.com/instagram-14-svg/

Wasai LLC.
[4] Lorem Ipsum Generator. (2022). Retrieved March 02 2023, from https://loremipsum.io/generator/?n=5&t=p

The following assets are my own property:

Images:
The following image files are my own screencaps from the Nintendo Game, Animal Crossing New Horizons:
- entrance.jpeg
- school.jpeg
- walkway,jpeg
- house.jpeg
- soccer.jpeg
- acnhbgdarker.png (Edited using IOS app Procreate)
- cherrybg.png (Edited using IOS app Procreate)
- darkbg.png (Edited using IOS app Procreate)

Videos:
The following video is my own screen recording from the Nintendo Game, Animal Crossing New Horizons:
- enokivid.mov


## File Tree:
a3_kl457563 (Root Directory)
|____.DS_Store
|____website_files
| |____resume.html
| |____index.html
| |____.DS_Store
| |____styles.css
| |____about.html
| |____contact.html
| |____images
| | |____favicon.ico
| | |____darkbg.png
| | |____.DS_Store
| | |____entrance.jpeg
| | |____soccer.jpeg
| | |____instagram1.png
| | |____cherrybg.png
| | |____house.jpeg
| | |____school.jpeg
| | |____walkway.jpeg
| | |____twitter1.png
| | |____acnhbgdarker.png
| |____script.js
| |____videos
| | |____.DS_Store
| | |____enokivid.mov
| |____README.txt
|____PDFs

Ensure file structure stays intact in order for website to format properly.


/* CODE */


## Table of Contents

* CSS used will be discussed alongside associated HTML or Javascript *
Section 1 – index.html
Section 2 – about.html
Section 3 – resume.html
Section 4 – contact.html
Section 5 – Media queries
Section 6 - script.js


## Section 1 – index.html

Landing page of website.

# Lines 1 - 10
- This block of code contains metadata, and links to stylesheets and favicon by Freepik [1] for website.

# Lines 12 - 28
- The code for my navigation bar. The mobile menu section is hidden unless the viewport is the size of a mobile screen.
CSS:
- This section is styled using Lines 35 - 82 from my linked styles.css sheet. 
- Media queries found starting from line 403 will update the size and state of elements within the navigation.
JS:
- This navigation section has an associated Event Listener in script.js from lines 51 - 70.

# Lines 33 - 49
- This is the hero image section of my website.
- This section contains the webpage page's main title and a showcase video.
CSS:
- This section is styled using Lines 85 - 152 in styles.css.
- I achieved this look by making this section in a flexbox, which can easily be resized for a fluid layout. I also used
    media queries to change certain attributes of this layout depending on the screen size.

# Lines 58 - 71
- This section contains the code to create the image carousel. This was probably the most challenging thing to implement
    on this entire webiste. 
- The html consists of a container holding three flex items: previous button, div holding desired images, and a next button.
CSS:
- This section is styled using Lines 154 - 205 from styles.css
- The .carousel selector is a flex box which is a parent container for the rest of the carousel.
- The look of the carousel is mostly created by making overflow hidden on the parent container, and
    setting the images to be the full width of the container.
- Associated buttons also have a z-index of 1 so that they will appear on top of the rest.
JS:
- This section has an associated Javascript Event Listener and function, on Lines 20-43 of script.js

# Lines 81 - 133
- main content of page
CSS:
- This section is styled primarily by Lines 207 - 281 of styles.css
- The layout is achieved by making the parent container a flex box which displays in a column directions
- Flex items hold each individual image and associated description, these children of the parent container are
    also flex boxes. For desktop they display in rows, and using media queries, they will change to display as
    a column for mobile.

# Lines 134 - 146
- This section contains the footer of the website.
- This section contains links to social media and the color palette changing buttons.
CSS:
- This section is styled using Lines 283 - 322 of styles.css
JS:
- The buttons have associated Event Listeners and functions on Lines 72 - 135 of script.js


## Section 2 – about.html

# Lines 33 - 46
- This section creates the top half of the page. This section contains an image and a description.
CSS:
- This section is styles using lines 207-281 from styles.css
- This section is a flex item of thr parent container, which displays as a row.

# Lines 48 - 123
- This code creates the bottom half of the page. This section contains a table, and an ordered list.
CSS:
- table and ordered list are styled using lines 324 - 375 of styles.css
- This section is a flex item of the parent container and is set to display in a column for mobile screens and
   media queries are used to make it display in a row for larger screens.


## Section 3 – resume.html
- This page currently has no content.
- This page has the same base code as the other pages so that the main layout is the same.
- Lines 29 - 34 contain a message for the viewer saying the page is under construction. 
- This page can be updated with new code in the future.


## Section 4 – contact.html

# Lines 30 - 53
- This code creates the contact form on this page.
CSS: 
- This form is styled using Lines 377 - 399 in styles.css


## Section 5 – Media queries

- In styles.css, I have created various media queries from Lines 402 - 578.
- When I first started Assignment 3, I tried to use graceful degradation to get my webpage to look good on
    mobile devices, but I found this difficult because there were too may contributing factors and there were many
    visual errors from making my website Desktop first. 
- I started from scratch and re-made my stylesheet and styled my website using a progressive enhancement approach.
- The base CSS rules in my stylesheet prioritize mobile viewing, and I used breakpoints to resize elements for larger resolutions.
- I created quite a few breakpoints starting from 600px, and set minimum pixel breakpoints at 700px, 1110px, and 1300px in order
   to resize certain elements of the page as the viewport changed.


## Section 6 - script.js

# Line 51 - function mobileMenu
- To make the drop down navigation menu, I added an event listener for when the user clicks on the mobile menu icon. 
- This will call the mobileMenu function which will add the .active class to the navMenu section, which will reveal 
    the menu that was previously hidden.

# Line 63 - function stickyBar
- To make the navigation stick to the top of the page, I call the stickyBar function when the window begins to scroll. 
    I created a variable to hold the offset of the navBar from the top. The stickyBar function checks if the window’s 
    offset is greater than the location of the navBar. If it is, that means the page has scrolled past where the navigation bar is,
    so the function will append the .sticky class to the navBar which will allow it to stick to same location on the top when scrolling.

# Lines 72 - 135 function setGreen, setPink, and setBlue
- These functions change the page color scheme when clicked.
- I created a variable 'currentTheme' to keep track of the current theme being used on the website.
- Each of these functions operate similarily, where they evaluate the current theme using conditionals and perform changes
    based on the outcome of the conditionals.
- I achieved color changes by using the DOM to change the root's variables which I had created in styles.css.

# Line 138 function helloMessage
- This function uses a small for loop to print a window alert to the screen. This function is called using an event listener
    when the user hovers over my website logo. This function will execute three times.


