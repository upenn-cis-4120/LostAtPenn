import React, { useState, useRef, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { ArrowUp, User } from 'lucide-react'

// Sample user data
const users = [
  { id: 1, name: 'Jiming Choi', avatarColor: '#8C1A11' },
  { id: 2, name: 'Ximin Liu', avatarColor: '#011F5B' },
  { id: 3, name: 'Jilice Luo', avatarColor: '#B0B0B0' },
]

// Initial messages for each user
const initialMessages = {
  1: [{ id: 1, content: 'hey bestie i lost my airpods and i think you found them. hmu!!!!!!!!! slayyy:)))))))', sender: 'them' }],
  2: [],
  3: [],
}

// Avatar component for user icons
const Avatar = ({ color }) => (
  <div
    className="rounded-full flex items-center justify-center mx-auto my-2"
    style={{ backgroundColor: color, width: '60px', height: '60px' }}
  >
    <User size={30} fill="white" />
  </div>
)

// UserList component for stacked avatars with dividers
const UserList = ({ users, selectedUser, setSelectedUser }) => (
  <div className="h-full border-r bg-white overflow-auto" style={{ width: '150px' }}>
    {users.map((user, index) => (
      <React.Fragment key={user.id}>
        <Button
          onClick={() => setSelectedUser(user.id)}
          className={`w-full p-3 d-flex align-items-center gap-3 text-start ${selectedUser === user.id ? 'bg-gray-50 border-l-4 border-primary' : ''}`}
          variant="link"
        >
          <Avatar color={user.avatarColor} />
          <span className="fw-bold" style={{ color: '#011F5B', textAlign: 'center', flex: 1 }}>{user.name}</span>
        </Button>
        {index < users.length - 1 && <hr className="m-0" />}
      </React.Fragment>
    ))}
  </div>
)

// MessageBubble component for chat messages with flexible width and alignment
const MessageBubble = ({ message, sender }) => (
  <div
    className={`mb-3 d-flex ${'justify-content-end'}`}
    style={{ width: '100%' }}
  >
    <div
      className={`p-3 flex rounded-lg ${sender === 'me' ? 'bg-primary text-white' : 'bg-gray-200 text-dark'}`}
      style={{
        maxWidth: '80%',
        fontFamily: 'Poppins, sans-serif',
        color: sender === 'me' ? 'white' : '#011F5B',
        borderRadius: '20px',
        overflowWrap: 'break-word',
        width: 'fit-content',
        marginLeft: sender === 'me' ? 'auto' : '0',
      }}
    >
      <p className="mb-0">{message}</p>
    </div>
  </div>
)

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(1)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = { id: Date.now(), content: message.trim(), sender: 'me' }
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedUser]: [...prevMessages[selectedUser], newMessage]
      }))
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e)
    }
  }

  return (
    <div className="h-screen flex">
      <UserList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-auto p-4" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          {messages[selectedUser].map((msg) => (
            <MessageBubble key={msg.id} message={msg.content} sender={msg.sender} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        

        <div className="p-4 border-t">
  <div className="flex items-center gap-2">
    <Form.Control
      placeholder="Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      style={{
        flexGrow: 1, // Allows the input to take most of the available width
        maxWidth: 'calc(100% - 50px)', // Leaves space for the button
        border: '2px solid #011F5B',
        paddingRight: '15px',
        paddingLeft: '15px',
        borderRadius: 'none'
      }}
    />
    <Button 
      onClick={handleSendMessage}
      className="rounded-circle d-flex align-items-center justify-content-center p-3.5"
      style={{ 
        width: '40px', 
        height: '40px',
        backgroundColor: '#8C1A11',
        border: 'none'
      }}
    >
      <ArrowUp size={20} color="white" />
    </Button>
  </div>
</div>
          </div>
        </div>
  )
}