"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, User } from "lucide-react"
import Image from "next/image"
import Header from "../components/Header"

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
  senderName: string
  attachment?: {
    name: string
    url: string
    type: string
  }
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Okay we can get another one and update the invoice document",
      sender: "other",
      timestamp: new Date(new Date().setHours(9, 35)),
      senderName: "Junaid",
    },
    {
      id: "2",
      content: "Need another clear document to be uploaded to the invoice document",
      sender: "user",
      timestamp: new Date(new Date().setHours(9, 36)),
      senderName: "You",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Position messages at the bottom initially
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      senderName: "You",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response after 1 second
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. I'll look into it.",
        sender: "other",
        timestamp: new Date(),
        senderName: "Junaid",
      }

      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create an object URL for the file
    const fileUrl = URL.createObjectURL(file)

    const message: Message = {
      id: Date.now().toString(),
      content: `Attached: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
      senderName: "You",
      attachment: {
        name: file.name,
        url: fileUrl,
        type: file.type,
      },
    }

    setMessages([...messages, message])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="p-4">
      <div className="flex flex-col h-[calc(100vh-8rem)] border rounded-lg overflow-hidden">
        <Header icon={true}>Chat with Bank</Header>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col">
          <div className="flex-1"></div>

          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}
                >
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      message.sender === "user" ? "bg-primary" : "bg-gray-700"
                    }`}
                  >
                    <User className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-1`}>
                      <span className="text-xs text-gray-500">
                        {message.senderName} •
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(message.timestamp)}
                      </span>
                    </div>

                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary/20 text-emerald-900" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>

                      {message.attachment && (
                        <div className="mt-2">
                          {message.attachment.type.startsWith("image/") ? (
                            <div className="relative w-full h-60">
                              <Image
                                src={message.attachment.url || "/placeholder.svg"}
                                alt={message.attachment.name}
                                className="rounded-md object-contain"
                                fill
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-md">
                              <Paperclip className="h-4 w-4" />
                              <span className="text-sm truncate">{message.attachment.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Type your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-12"
              />
              <button
                onClick={handleAttachment}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-500"
              >
                <Paperclip className="h-5 w-5" />
              </button>
            </div>
            <Button onClick={handleSendMessage} className="bg-primary text-white">
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
      </div>
    </div>
  )
}

