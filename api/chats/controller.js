import Chat from './model.js';
import responser from '../../network/response.js';
import { io } from '../../index.js';

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        /* const chats = await Chat.find({
            $or: [
                { user: userId },
                { agent: userId }
            ]
        })
            .populate('user')
            .populate('agent')
            .populate('message'); */


        responser.success({ res, message: "Deposits retrieved successfully", body: { userId } });
    } catch (error) {
        console.error(error);
        response.error({ res, message: error?.message || error });
    }
};

export const createChat = async (req, res) => {
    try {

        const { from, to, message, depositId } = req.body
        const data = { from, to, message, depositId }

        //anadir segurodad y validaciones 
        const newChat = new Chat(data)
        const response = await newChat.save()

        io.emit('chat', response.toObject())
        responser.success({ res, message: 'Create chat', body: response });
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
}
