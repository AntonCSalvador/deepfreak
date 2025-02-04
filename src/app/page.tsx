"use client"

import type React from "react"
import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { PlusCircle, Send } from "lucide-react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    await handleSubmit(e) // If handleSubmit returns void, this will just run synchronously
    setIsTyping(false)
  }
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <Button variant="outline" className="w-full mb-4">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
        <div className="space-y-2">
          <div className="p-2 hover:bg-gray-700 rounded cursor-pointer">Previous Chat 1</div>
          <div className="p-2 hover:bg-gray-700 rounded cursor-pointer">Previous Chat 2</div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md p-4 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-white"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-md p-4 rounded-lg bg-white">AI is typing...</div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-white">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

