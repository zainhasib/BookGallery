import { Book } from './book';

export class BookPageResponse {
    success: boolean;
    pages: number;
    data: Book[];
}
