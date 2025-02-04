import type { Message } from "ai"

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-md p-4 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-white"}`}>
        {message.content}
      </div>
    </div>
  )
}

