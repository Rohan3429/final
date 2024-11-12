// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './Chat.css'; // Import the CSS file

// const Chat = ({ user }) => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState('');
//   const [onlineUsers, setOnlineUsers] = useState(new Set());
//   const socketRef = useRef();
//   const messagesEndRef = useRef(null);

//   console.log("selectedUser: ", selectedUser);
//   console.log("messages: ", messages);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/users');
//         const data = await response.json();
//         setUsers(data.users.filter((u) => u._id !== user));
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, [user]);

//   useEffect(() => {
//     socketRef.current = io(`${import.meta.env.VITE_API_URL}`);
//     socketRef.current.emit('join', { userId: user });

//     socketRef.current.on('onlineUsers', (users) => {
//       setOnlineUsers(new Set(users));
//     });

//     socketRef.current.on('message', (message) => {
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [message.conversationId]: [
//           ...(prevMessages[message.conversationId] || []),
//           message,
//         ],
//       }));
//       scrollToBottom();
//     });

//     socketRef.current.on('previousMessages', ({ conversationId, messages }) => {
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [conversationId]: messages,
//       }));
//       scrollToBottom();
//     });

//     return () => socketRef.current.disconnect();
//   }, [user]);

//   useEffect(() => {
//     if (selectedUser) {
//       const conversationId = [selectedUser._id,user].join('-');
//       socketRef.current.emit('joinConversation', { conversationId });
//       socketRef.current.emit('fetchMessages', { conversationId });
//     }
//   }, [selectedUser, user]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && selectedUser) {
//       const conversationId = [user, selectedUser._id].sort().join('-');
//       const messageData = {
//         senderId: user,
//         receiverId: selectedUser._id,
//         text: newMessage,
//         conversationId,
//         senderName: user.name,
//         timestamp: new Date(),
//       };
//       socketRef.current.emit('sendMessage', messageData);
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [conversationId]: [
//           ...(prevMessages[conversationId] || []),
//           messageData,
//         ],
//       }));
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="sidebar">
//         <div className="header">Chats</div>
//         <div className="user-list">
//           {users.map((u) => (
//             <div
//               key={u._id}
//               onClick={() => setSelectedUser(u)}
//               className={`user-item ${selectedUser?._id === u._id ? 'selected' : ''}`}
//             >
//               <div className="user-avatar">{u.fullName[0].toUpperCase()}</div>
//               <div className="user-info">
//                 <h3>{u.fullName}</h3>
//                 <span className={`status ${onlineUsers.has(u._id) ? 'online' : ''}`}>
//                   {onlineUsers.has(u._id) ? 'Online' : 'Offline'}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="chat-window">
//         {selectedUser ? (
//           <>
//             <div className="chat-header">
//               Chat with {selectedUser.fullName}
//             </div>
//             <div className="chat-messages">
//               {messages[`${selectedUser._id}-${user}`]?.map((message) => (
//                 <div
//                   key={message._id}
//                   className={`message ${message.senderId === user ? 'sent' : 'received'}`}
//                 >
//                   <div>{message.text}</div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             <div className="chat-footer">
//               <input
//                 type="text"
//                 className="input"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button className="send-button" onClick={sendMessage}>
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="chat-header">Select a user to start chatting</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;

// ---------------------------------------------------------------------


// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './Chat.css';

// const Chat = ({ user }) => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState('');
//   const [onlineUsers, setOnlineUsers] = useState(new Set());
//   const socketRef = useRef();
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Helper function to generate consistent conversation ID
//   const getConversationId = (userId1, userId2) => {
//     return [userId1, userId2].sort().join('-');
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/users');
//         const data = await response.json();
//         setUsers(data.users.filter((u) => u._id !== user));
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, [user]);

//   useEffect(() => {
//     socketRef.current = io(`${import.meta.env.VITE_API_URL}`, {
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current.emit('join', { userId: user });

//     socketRef.current.on('onlineUsers', (users) => {
//       setOnlineUsers(new Set(users));
//     });

//     socketRef.current.on('message', (message) => {
//       setMessages((prevMessages) => {
//         const conversationId = getConversationId(message.senderId, message.receiverId);
//         return {
//           ...prevMessages,
//           [conversationId]: [
//             ...(prevMessages[conversationId] || []),
//             message,
//           ],
//         };
//       });
//       scrollToBottom();
//     });

//     socketRef.current.on('previousMessages', ({ conversationId, messages }) => {
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [conversationId]: messages,
//       }));
//       scrollToBottom();
//     });

//     return () => socketRef.current.disconnect();
//   }, [user]);

//   useEffect(() => {
//     if (selectedUser) {
//       const conversationId = getConversationId(user, selectedUser._id);
//       socketRef.current.emit('joinConversation', { conversationId });
//       socketRef.current.emit('fetchMessages', { conversationId });
//     }
//   }, [selectedUser, user]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && selectedUser) {
//       const conversationId = getConversationId(user, selectedUser._id);
//       const messageData = {
//         senderId: user,
//         receiverId: selectedUser._id,
//         text: newMessage,
//         conversationId,
//         timestamp: new Date(),
//       };

//       socketRef.current.emit('sendMessage', messageData);
//       setNewMessage('');
//     }
//   };

//   const getMessagesForConversation = () => {
//     if (!selectedUser) return [];
//     const conversationId = getConversationId(user, selectedUser._id);
//     return messages[conversationId] || [];
//   };

//   return (
//     <div className="chat-container">
//       <div className="sidebar">
//         <div className="header">Chats</div>
//         <div className="user-list">
//           {users.map((u) => (
//             <div
//               key={u._id}
//               onClick={() => setSelectedUser(u)}
//               className={`user-item ${selectedUser?._id === u._id ? 'selected' : ''}`}
//             >
//               <div className="user-avatar">{u.fullName[0].toUpperCase()}</div>
//               <div className="user-info">
//                 <h3>{u.fullName}</h3>
//                 <span className={`status ${onlineUsers.has(u._id) ? 'online' : ''}`}>
//                   {onlineUsers.has(u._id) ? 'Online' : 'Offline'}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="chat-window">
//         {selectedUser ? (
//           <>
//             <div className="chat-header">
//               Chat with {selectedUser.fullName}
//             </div>
//             <div className="chat-messages">
//               {getMessagesForConversation().map((message, index) => (
//                 <div
//                   key={message._id || index}
//                   className={`message ${message.senderId === user ? 'sent' : 'received'}`}
//                 >
//                   <div className="message-content">
//                     <div className="message-text">{message.text}</div>
//                     <div className="message-time">
//                       {new Date(message.timestamp).toLocaleTimeString()}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             <form className="chat-footer" onSubmit={sendMessage}>
//               <input
//                 type="text"
//                 className="input"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button type="submit" className="send-button">
//                 Send
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="no-chat-selected">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;


// ---------------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { format } from 'date-fns';
import { 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical, 
  Search, 
  Phone, 
  Video,
  Image as ImageIcon,
  File,
  Mic
} from 'lucide-react';

const Chat = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  // ... (keep all the existing socket logic and helper functions)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper function to generate consistent conversation ID
  const getConversationId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('-');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data.users.filter((u) => u._id !== user));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_URL}`, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.emit('join', { userId: user });

    socketRef.current.on('onlineUsers', (users) => {
      setOnlineUsers(new Set(users));
    });

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => {
        const conversationId = getConversationId(message.senderId, message.receiverId);
        return {
          ...prevMessages,
          [conversationId]: [
            ...(prevMessages[conversationId] || []),
            message,
          ],
        };
      });
      scrollToBottom();
    });

    socketRef.current.on('previousMessages', ({ conversationId, messages }) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [conversationId]: messages,
      }));
      scrollToBottom();
    });

    return () => socketRef.current.disconnect();
  }, [user]);

  useEffect(() => {
    if (selectedUser) {
      const conversationId = getConversationId(user, selectedUser._id);
      socketRef.current.emit('joinConversation', { conversationId });
      socketRef.current.emit('fetchMessages', { conversationId });
    }
  }, [selectedUser, user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const conversationId = getConversationId(user, selectedUser._id);
      const messageData = {
        senderId: user,
        receiverId: selectedUser._id,
        text: newMessage,
        conversationId,
        timestamp: new Date(),
      };

      socketRef.current.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  const getMessagesForConversation = () => {
    if (!selectedUser) return [];
    const conversationId = getConversationId(user, selectedUser._id);
    return messages[conversationId] || [];
  };


  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(message => {
      const date = getMessageDate(message.timestamp);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    return grouped;
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <button className="text-gray-600 hover:text-gray-800">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((u) => (
            <div
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors
                ${selectedUser?._id === u._id ? 'bg-blue-50' : ''}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(u.fullName)}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                  ${onlineUsers.has(u._id) ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{u.fullName}</h3>
                  <span className="text-xs text-gray-500">12:45 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Click to start conversation
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(selectedUser.fullName)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{selectedUser.fullName}</h3>
                  <span className={`text-sm ${onlineUsers.has(selectedUser._id) ? 'text-green-500' : 'text-gray-500'}`}>
                    {onlineUsers.has(selectedUser._id) ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800">
                  <Phone size={20} />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Video size={20} />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Search size={20} />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4">
              {Object.entries(groupMessagesByDate(getMessagesForConversation())).map(([date, dateMessages]) => (
                <div key={date}>
                  <div className="flex items-center justify-center my-4">
                    <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
                      {date}
                    </div>
                  </div>
                  {dateMessages.map((message, index) => (
                    <div
                      key={message._id || index}
                      className={`flex ${message.senderId === user ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div className={`max-w-[70%] ${message.senderId === user ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`relative px-4 py-2 rounded-lg shadow-sm
                            ${message.senderId === user 
                              ? 'bg-blue-500 text-white rounded-br-none' 
                              : 'bg-white text-gray-800 rounded-bl-none'}`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <span className={`text-xs mt-1 block
                            ${message.senderId === user ? 'text-blue-100' : 'text-gray-500'}`}>
                            {format(new Date(message.timestamp), 'h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="h-24 border-t border-gray-200 px-4 py-3 bg-white">
              <form onSubmit={sendMessage} className="h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <Paperclip size={20} />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <ImageIcon size={20} />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <File size={20} />
                  </button>
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <Smile size={20} />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <Mic size={20} />
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Welcome to Messages</h3>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;