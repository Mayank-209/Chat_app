import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, resp) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const { message } = req.body;
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    
    await gotConversation.save();
    }
    const recieverSocketId=getReceiverSocketId(recieverId)
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage",newMessage);
    }
    return resp.status(201).json({
      newMessage,
    });
    //SocketIO
    

   
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, resp) => {
  try {
    const recieverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,recieverId]}
    }).populate("messages");
    return resp.status(200).json(conversation.messages)
  } catch (error) {
    console.log(error);
  }
};
