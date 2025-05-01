// Problem statement:
// Create a Playlist constructor that initializes with an empty songs array. Add a method addSong(song) to the prototype that adds a new song to the playlist.

// Challenge:
    // Implement a constructor function Playlist that initializes an empty songs array.
    // Attach a method addSong(song) to its prototype that adds the song to the songs array.

 function Playlist() {
    // Initialize songs property
    this.songs = []
}

// Define addSong method on Playlist's prototype
Playlist.prototype.addsong = function (...songs){
    this.songs.push(...songs)
}

let list = new Playlist()
// console.log(Playlist.addsong);
list.addsong("Tum hi ho", "Baarish");
console.log(list);


