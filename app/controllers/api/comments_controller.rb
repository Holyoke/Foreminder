class Api::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_reminder, only: [:index, :create]
  before_action :set_comment, only: [:update, :destroy]

  def index
    @comments = @reminder.comments
    render json: @comments
  end

  def create
    @comment = @reminder.comments.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    render json: @comment
  end

  private
    def set_reminder
      @reminder = current_user.reminders.find(params[:reminder_id])
    end

    def set_comment
      @comment = current_user.comments.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:body, :active)
    end
end
