export class Book{
    public id: number;
    public title: string;
    public author: string;
    public description: string;
    public imagePath: string;
    public price: number;

    constructor(id: number, title: string, author: string, description: string, imagePath: string, price: number){
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
    }

}