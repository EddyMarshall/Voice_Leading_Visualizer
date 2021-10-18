
# Live Site: [Voice Leading Visualizer](https://eddymarshall.github.io/Voice_Leading_Visualizer/)

# Overview: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To understand this project, we must first understand voice leading. Good 
voice leading in music is the technique of changing chords as 
efficiently as possible. First, know that a chord in music is comprised of 
multiple notes played simulataneously. Take C major for instance. When you 
play C major, you're really playing the notes C, E, and G. E minor is E, G,
and B. Many guitarists will jump all over their instrument to go from C to G,
when really, they only have to change one single note! (CEG --> BEG). 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This app provides a practice tool for guitarists to learn notes all over 
the fretboard so that they can smoothly transition between chords with as 
little movement as possible. This will make them better solo players, and 
much better band members as they will no longer be stepping on the musical
toes of what the other musicians are playing. 




### In Voice Leading Visualizer users are be able to:
1. Input two chords and see all the different ways to smoothly move from one 
    note to the next on the fretboard.

2. Input a key and see how to travel from any chord in that key to any other 
    chord in that key.

3. Checkout the README if they are curious programmers looking to get into my head.


### In addition, this project will soon include:
1. reading materials on what makes for "good" voice leading. There will be tips on when to follow traditional voice leading and of course, when to break the rules.

2. Input many chords (perhaps the chords of a song) and PLAY ALONG with the 
    visualized changes at a speed of your choosing. 

3. Input many chords (perhaps the chords of a song) and see a visualization of 
    efficient ways of playing those chords.

__________________________________________________________________________________________
## Visual reference:
![Here is a wireframe of the main page](wireframe.png)

* Dark mode lets users rest their eyes and their battery power by darkening the background of the app.
* The change key drop down and choose chord drop down allow the user to change options without navigating away from the current view.
* On the guitar neck in the middle, notes of chosen chords, scales, and triads are shown.
* When voice leading mode is active, users will be able to select what strings they are playing on with the strings dropdown menu.
* The user can also play the chord to hear how it sounds.
* Users can also quickly cycle through chords by choosing a distance in the bottom right menu and pressing the spacebar to jump that distance.


__________________________________________________________________________________________
### This project was implemented with the following technologies:

* Webpack to bundle and transpile JavaScript code.
* npm to manage project dependencies.

___________________

## Let's take a peek under the hood:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here is the function I created to switch
into and out of voice leading mode. There are A LOT of things that need to happen so I made sure to use semantic variable names and outsource as many of the methods to other single use methods to ensure the code is maintainable.

```js
function switchModes() {
        const toggleButton = document.getElementById("voice-lead-toggle");
        const radioSelectors = document.getElementsByClassName("navradios")
        document.getElementById("dynamic").innerHTML = ""
        const currentMenuVisibility = document.getElementById("voice-leading-menus")
        const cyclerMenuVisibility = document.getElementById("cycle-selector-menus")
        const currentRange = createDefaultChordRanges(`${content.key} Major`, "1, 2, 3")
        
        if (toggleButton.innerText === "Enter Voice Leading Mode") {
            //START voice leading mode
            toggleButton.innerText = "Exit Voice Leading Mode"

            //declare new voice lead object
            content = new voiceLead(content.key, 1, "1, 2, 3", currentRange);
            addFretDots();
            currentMenuVisibility.style.visibility = "visible"
            cyclerMenuVisibility.style.visibility = "visible"
            if (currentMenuVisibility.children.length === 0) {
                makeVoiceLeadingMenus();
            }
            radioSelectors[0].style.setProperty("--navdisplay", "none")
            currentMenuVisibility.firstElementChild.firstElementChild.selected = "selected"
        } else {
            //EXIT voice leading mode
            radioSelectors[0].style.setProperty("--navdisplay", "flex")
            toggleButton.innerText = "Enter Voice Leading Mode"
            currentMenuVisibility.style.visibility = "hidden"
            cyclerMenuVisibility.style.visibility = "hidden"

            //declare new non voice leading guitar
            content = new Guitar(body, content.guitar.key, dynamic);
            addFretDots();
        }

        //helper method to set the chord menu back to the root chord
        resetChordMenu();
        addChordChangeListener();
    }
```
___________________
### Coming Soon:

* Play along section in which the user specifies a tempo and a harmonic cycle, then plays along the changing visualization with a click track.

* This will eventually be expanded to display sheet music as well as a guitar visualization so that it can be used by musicians on other chordal instruments such as the piano.

* Video demonstrations of voice leading in action will be a great additional motivator for students.

* Furthermore, this page will eventually be populated from a database of thousands of hit songs so the user can search for and instantly see all the different ways that they can play their favorite songs.