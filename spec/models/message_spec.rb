require 'rails_helper'
describe Message do
  describe '#create' do

    context 'can save' do
      it "Save if you have a message" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "Save if you have an image" do
        message = build(:message, content: nil)
        expect(message).to be_valid
      end

      it "Save messages and images" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "Cannot save without message and image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "Cannot save without group_id" do
        message = build(:message, group: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "Cannot save without user_id" do
        message = build(:message, user: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
    
  end
end