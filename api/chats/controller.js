import Chat from './model.js';
import response from '../../network/response.js';

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


        response.success({ res, message: "Deposits retrieved successfully", body: {userId} });
    } catch (error) {
        console.error(error);
        response.error({ res, message: error?.message || error });
    }
};

export const createChat = (req, res) => {
    response.success({ res, message: 'Create chat', status: 201 });
}
