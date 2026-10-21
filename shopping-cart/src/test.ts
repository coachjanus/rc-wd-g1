class Album1 implements IAlbum {
    // protected title: string;
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[];

    constructor(opts: { title: string; artist: string; releaseYear: number, trackList: string[] }) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
        this.trackList = opts.trackList;
    }
    displayInfo() {
        console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`,);
    }
}

interface IAlbum {
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[];
}

class SpecialEditionAlbum extends Album1 {
    // bonusTracks
    // bonusTracks: string[];

    // constructor(opts: { title: string; artist: string; releaseYear: number, bonusTracks: string[] }) {
    //     super(opts);
    //     this.bonusTracks = opts.bonusTracks;
    // }

    getTitle() {
        return this.title;
    }

    override displayInfo() {
        console.log(
            `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
        );
        // console.log(`Bonus tracks: ${this.bonusTracks.join(", ")}`);
    }
}

const opts = {
    title: "Plastic Ono Band",
    artist: "John Lennon",
    releaseYear: 2000,
    bonusTracks: ["Power to the People", "Do the Oz"],
};

// let specialEditionAlbum = new SpecialEditionAlbum(opts);

abstract class AlbumBase {
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[] = [];
    constructor(opts: { title: string; artist: string; releaseYear: number }) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }
    addTrack(track: string) {
        this.trackList.push(track);
    }

    abstract addReview(author: string, review: string): void;
}

class Album extends AlbumBase {
    addReview(author: string, review: string): void{
        
    };
}

const album = new Album({
    title: "Unknown Album",
    artist: "Unknown Artist",
    releaseYear: 0,
});