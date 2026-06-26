import { tavily } from "@tavily/core"
import { TAVILY_API_KEY } from "../config/env.js"

const tavilyClient = tavily({apiKey: TAVILY_API_KEY})



export const searchWebTool = {
    type: "function",
    function: {
        name: "search_web",
        description: "Search the web for solutions, documentation, or fixes. Use this after reading the code when you need external knowledge to solve the problem.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search query e.g. Express CORS error fix Node.js"
                }
            },
            required: ["query"]
        }
    }
}

export const searchWeb = async (query) => {
    const result = await tavilyClient.search(query, { maxResults: 3 })

    const cleaned = result.results.map(r => ({
        title: r.title,
        url: r.url,
        content: r.content?.slice(0, 300) 
    }))

    return JSON.stringify(cleaned)
}