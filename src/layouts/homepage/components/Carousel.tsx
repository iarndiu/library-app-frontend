import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { error } from "console";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isloading, setIsloading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: String = "http://127.0.0.1:8080/api/books";
            const page: number = 0;
            const size: number = 9;
            const url: URL = new URL(`${baseUrl}?page=${page}&size=${size}`);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            const loadedBooks: BookModel[] = [];
            for (const k in responseData) {
                loadedBooks.push({
                    id: responseData[k].id,
                    title: responseData[k].title,
                    author: responseData[k].author,
                    description: responseData[k].description,
                    copies: responseData[k].copies,
                    copiesAvailable: responseData[k].copiesAvailable,
                    category: responseData[k].category,
                    img: responseData[k].img,
                });
            }

            setBooks(loadedBooks);
            setIsloading(false);

        };
        fetchBooks().catch((error: any) => {
            setIsloading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isloading) {
        return (
            <div className="container m-5">
                <SpinnerLoading />
            </div>
        )
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[0]} key={books[0].id} />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}