import { deepseek } from "@ai-sdk/deepseek"
import { streamText } from "ai"

export const runtime = "edge"

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: deepseek("deepseek-reasoner"),
    messages,
  })
  return result.toDataStreamResponse()
}

