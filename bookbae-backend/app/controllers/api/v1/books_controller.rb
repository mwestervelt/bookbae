class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]
    skip_before_action :authorized


  # CUSTOM ROUTE FOR SEARCH
  def search
    render json: Book.search(params["term"])
  end

  # POST /books
  def create
    @book = Book.find_or_create_by(book_params)
    render json: @book
  end

    # GET /books
  def index
      @books = Book.all
      render json: @books
  end

    # GET /books/1
  def show
      render json: @book
  end

    # PATCH/PUT /books/1
  def update
      if @book.update(book_params)
        render json: @book
      else
        render json: @book.errors, status: :unprocessable_entity
      end
  end

    # DELETE /books/1
  def destroy
    @book.destroy
  end



  private

  def set_book
    @book = Book.find(params[:id])
  end

    # Only allow a trusted parameter "white list" through.
  def book_params
    params.require(:book).permit(:title, :author, :description, :image)
  end

end
