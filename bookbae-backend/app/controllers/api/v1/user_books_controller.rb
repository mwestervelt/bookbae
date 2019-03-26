class Api::V1::UserBooksController < ApplicationController
  before_action :set_user_book, only: [:show, :update, :destroy]
  skip_before_action :authorized

  # GET /user_books
  def index
    @user_books = UserBook.all

    render json: @user_books
  end

  # GET /user_books/1
  def show
    render json: @user_book
  end

  # POST /user_books
  def create
    @user_book = UserBook.find_or_create_by(user_book_params)

    render json: @user_book
  end

  # PATCH/PUT /user_books/1
  def update
    if @user_book.update(user_book_params)
      render json: {user_book: @user_book}
    else
      render json: @user_book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_books/1
  def destroy
    @user = User.find(@user_book.user_id)
    @user_book.destroy
    render json: @user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_book
      @user_book = UserBook.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_book_params
      params.require(:user_book).permit(:user_id, :book_id, :shelf_type)
    end
end
