import Groq from "groq-sdk"
import { GROQ_API_KEY } from "../config/env.js"
import { readGithubFileTool, readGithubFile } from "../tools/readGithubFile.js"
import { searchWebTool, searchWeb } from "../tools/searchWeb.js"

const groq = new Groq({ apiKey: GROQ_API_KEY })

export const agentLoop = async (userMessage, project) => {

    const { githubToken, repoOwner, repoName } = project

    const tools = [readGithubFileTool, searchWebTool]

    const messages = [
        {
            role: "system",
            content: `You are DevMind, an AI agent that helps developers fix bugs.
You have access to the user's GitHub repo (${repoOwner}/${repoName}) and web search.
Always read the relevant code file first before searching the web.
Give specific fixes with exact file names and line numbers.
Be concise and direct.`
        },
        {
            role: "user",
            content: userMessage
        }
    ]

    let usedFile = null

    // ReAct loop — runs until LLM gives final answer
    while (true) {

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages,
            tools,
            tool_choice: "auto",
            temperature: 0,
            parallel_tool_calls: false,
            reasoning_format: "hidden"
        })

        const message = response.choices[0].message
        const finishReason = response.choices[0].finish_reason

        // LLM gave final answer — stop loop
        if (finishReason === "stop" || !message.tool_calls) {
            return {
                answer: message.content,
                usedFile
            }
        }

        // LLM wants to call tools — execute all of them
        messages.push(message)

        for (const toolCall of message.tool_calls) {
            const toolName = toolCall.function.name
            const toolArgs = JSON.parse(toolCall.function.arguments)

            console.log(`Agent calling: ${toolName}`, toolArgs)

            let toolResult

            if (toolName === "read_github_file") {
                usedFile = toolArgs.filepath
                toolResult = await readGithubFile(
                    toolArgs.filepath,
                    githubToken,
                    repoOwner,
                    repoName
                )
            }

            if (toolName === "search_web") {
                toolResult = await searchWeb(toolArgs.query)
            }

            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: toolResult
            })
        }

        // Loop again — LLM sees tool results and decides next step
    }
}