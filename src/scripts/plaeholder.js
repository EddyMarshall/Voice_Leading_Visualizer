




//if index of one of the chords is 1 || index of one of the chords is 0
    //if 



//if it gets undefined, create original chord chosen strings, chosen triad


function createDefaultChordRanges(chord, stringChoice) {
    if (chord === "C Major" || chord === "G Major" || chord === "E Minor") {
        if (stringChoice === "3,4,5" || stringChoice === "4,5,6") {
            return "4, 9"
        } else {
            return "3, 8"
        }
    } else if (chord === "D Major") {
        if (stringChoice === "3,4,5") {
            return "6, 10"
        } else if (stringChoice === "4,5,6") {
            return "3, 5"
        } else {
            return "5, 7"
        }
    } else if (chord === "F Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "5, 8"
        } else {
            return "6, 8"
        }
    } else if (chord === "A Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" ||
            stringChoice === "3,4,5") {
            return "5, 7"
        } else {
            return "6, 8"
        }
    } else if (chord === "B Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 9"
        } else if (stringChoice === "3,4,5") {
            return "3, 5"
        } else {
            return "3, 7"
        }
    } else if (chord === "C Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "3, 5"
        } else {
            return "5, 8"
        }
    } else if (chord === "C Diminished") {
        if (stringChoice === "1,2,3") {
            return "7, 8"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5"){
            return "4, 6"
        } else {
            return "4, 8"
        }
    } else if (chord === "B Minor" || chord === "B Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "7, 9"
        } else {
            return "4, 7"
        }
    } else if (chord === "Bb Major" || chord === "A# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "6, 8"
        } else {
            return "3, 6"
        }
    } else if (chord === "Bb Minor" || chord === "A# Minor") {
        return "6, 9"
    } else if (chord === "Bb Diminished" || chord === "A# Diminished") {
        if (stringChoice === "1,2,3") {
            return "5, 6"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "5, 8"
        } else {
            return "7, 9"
        }
    } else if (chord === "A Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "5, 7"
        } else {
            return "2, 5"
        }
    } else if (chord === "A Diminished") {
        if (stringChoice === "1,2,3") {
            return "4, 5"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 7"
        } else {
            return "6, 8"
        }
    } else if (chord === "Ab Major" || chord === "G# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 6"
        } else {
            return "6, 8"
        }
    } else if (chord === "Ab Minor" || chord === "G# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "4, 6"
        } else {
            return "6, 7"
        }
    } else if (chord === "Ab Diminished" || chord === "G# Diminished") {
        if (stringChoice === "1,2,3") {
            return "3, 4"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "3, 6"
        } else {
            return "5, 7"
        }
    } else if (chord === "G Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "3, 5"
        } else {
            return "5, 6"
        }
    } else if (chord === "G Diminished") {
        if (stringChoice === "1,2,3") {
            return "2, 3"
        } else if (stringChoice === "2,3,4" || stringChoice === "3,4,5") {
            return "2, 5"
        } else {
            return "4, 6"
        }
    } else if (chord === "Gb Major" || chord === "F# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 8"
        } else if (stringChoice === "3,4,5"){
            return "6, 9"
        } else {
            return "8, 9"
        }
    } else if (chord === "Gb Minor" || chord === "F# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "6, 9"
        } else {
            return "7, 9"
        }
    } else if (chord === "Gb Diminished" || chord === "F# Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "5, 9"
        } else {
            return "7, 9"
        }
    } else if (chord === "F Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4,6"
        } else if (stringChoice === "3,4,5") {
            return "5, 8"
        } else {
            return "6, 8"
        }
    } else if (chord === "F Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "4, 8"
        } else {
            return "6, 8"
        }
    } else if (chord === "E Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "4, 7"
        } else {
            return "6, 7"
        }
    } else if (chord === "E Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "3, 5"
        } else if (stringChoice === "3,4,5") {
            return "3, 7"
        } else {
            return "5, 7"
        }
    } else if (chord === "Eb Major" || chord === "D# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 8"
        } else if (stringChoice === "3,4,5") {
            return "3, 6"
        } else {
            return "5, 6"
        }
    } else if (chord === "Eb Minor" || chord === "D# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "6, 8"
        } else if (stringChoice === "3,4,5") {
            return "8, 9"
        } else {
            return "4, 6"
        }
    } else if (chord === "Eb Diminished" || chord === "D# Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "2, 4"
        } else if (stringChoice === "3,4,5") {
            return "2, 6"
        } else {
            return "4, 6"
        }
    } else if (chord === "D Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "5, 7"
        } else if (stringChoice === "3,4,5") {
            return "2, 5"
        } else {
            return "4, 5"
        }
    } else if (chord === "D Diminished") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 7"
        } else if (stringChoice === "3,4,5") {
            return "6, 8"
        } else {
            return "3, 5"
        }
    } else if (chord === "Db Major" || chord === "C# Major") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "4, 6"
        } else {
            return "3, 4"
        }
    } else if (chord === "Db Minor" || chord === "C# Minor") {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "4, 6"
        } else if (stringChoice === "3,4,5") {
            return "6, 7"
        } else {
            return "6, 9"
        }
    } else {
        if (stringChoice === "1,2,3" || stringChoice === "2,3,4") {
            return "3, 6"
        } else if (stringChoice === "3,4,5") {
            return "5, 7"
        } else {
            return "4, 8"
        }
    }
}