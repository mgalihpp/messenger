<?php

namespace App\Traits;

use App\Models\ChatMessage;

trait Chat
{
    /**
     * Retrieves a collection of chat messages with associated sender and recipient information.
     *
     * This function queries the ChatMessage model to fetch all chat messages,
     * along with their associated sender ('from') and recipient ('to') relationships.
     * Each chat message is mapped to a new object containing the following properties:
     * - id: The recipient's ID.
     * - name: The recipient's name.
     * - avatar: The recipient's avatar URL.
     * - from_id: The ID of the sender.
     * - body: The content of the chat message.
     * - is_read: A boolean indicating if the message is read (always true).
     * - is_reply: A boolean indicating if the message is a reply (always false).
     * - is_online: A boolean indicating if the recipient is online.
     * - created_at: The timestamp when the chat message was created.
     * - chat_type: The type of chat, as defined by the CHAT_TYPE constant.
     *
     * @return \Illuminate\Support\Collection A collection of mapped chat objects.
     */
    public function chats()
    {

        // export type Chat = {
        //     id: string;
        //     name: string;
        //     avatar: string;
        //     message_id: string;
        //     from_id: string;
        //     body: string;
        //     is_read: boolean;
        //     is_reply: boolean;
        //     is_online: boolean;
        //     created_at: string;
        //     chat_type: CHAT_TYPE;
        //   };

        // $chats = ChatMessage::with('from', 'to')->get()->map(function ($chat) {
        //     $mapped = new \stdClass();
        //     $mapped->id = $chat->to->id;
        //     $mapped->name = $chat->to->name;
        //     $mapped->avatar = $chat->to->avatar;
        //     $mapped->from_id = $chat->from_id;
        //     $mapped->body = $chat->body;
        //     $mapped->is_read = true;
        //     $mapped->is_reply = false;
        //     $mapped->is_online = $chat->to->is_online;
        //     $mapped->created_at = $chat->created_at;
        //     $mapped->chat_type = ChatMessage::CHAT_TYPE;
        //     return $mapped;
        // });

        $chats = ChatMessage::with('from', 'to')->paginate(25);

        foreach ($chats as $key => $chat) {
            $mapped = new \stdClass();
            $mapped->id = $chat->to->id;
            $mapped->name = $chat->to->name;
            $mapped->avatar = $chat->to->avatar;
            $mapped->from_id = $chat->from_id;
            $mapped->body = $chat->body;
            $mapped->is_read = true;
            $mapped->is_reply = false;
            $mapped->is_online = $chat->to->is_online;
            $mapped->created_at = $chat->created_at;
            $mapped->chat_type = ChatMessage::CHAT_TYPE;

            $chats[$key] = $mapped;
        }


        return $chats;
    }
}
