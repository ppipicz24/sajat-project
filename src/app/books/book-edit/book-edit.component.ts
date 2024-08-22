import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {

  id:number
  editMode = false
  bookForm: FormGroup

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router) {}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] !== undefined;
      console.log(params['id'])
      this.initForm()
    })
  }

  private initForm(){
    let bookTitle = ''
    let bookAuthor = ''
    let bookDescription = ''
    let bookImage = ''
    let bookPrice
    console.log(this.editMode)

    if(this.editMode){
      const book = this.bookService.getBook(this.id)
      bookTitle = book.title
      bookAuthor = book.author
      bookDescription = book.description
      bookImage = book.imageUrl
      bookPrice = book.price
    }

    this.bookForm = new FormGroup({
      title: new FormControl(bookTitle, Validators.required),
      author: new FormControl(bookAuthor, Validators.required),
      description: new FormControl(bookDescription, Validators.required),
      imagePath: new FormControl(bookImage, Validators.required),
      price: new FormControl(bookPrice, Validators.required)
    })
  }

}
