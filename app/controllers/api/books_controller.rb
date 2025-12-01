class Api::BooksController < Api::BaseController
  before_action :set_book, only: %i[show update destroy]
  before_action :authorize_librarian!, only: %i[create update destroy]

  # GET /api/books
  def index
    q = params[:q]

    if q.present?
      @books = Book.where(
        "title ILIKE :q OR author ILIKE :q OR genre ILIKE :q",
        q: "%#{q}%"
      )
    else
      @books = Book.all
    end

    render json: @books
  end

  # GET /api/books/:id
  def show
    render json: @book
  end

  # POST /api/books
  def create
    @book = Book.new(book_params)

    if @book.save
      render json: @book, status: :created
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH /api/books/:id
  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/books/:id
  def destroy
    @book.destroy
    head :no_content
  end

  private

  def authorize_librarian!
    return if current_user.librarian?

    render json: { error: "Forbidden — librarians only" }, status: :forbidden
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author, :genre, :isbn, :total_copies)
  end
end
