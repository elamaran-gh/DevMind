export const readGithubFileTool = {
    type: "function",
    function: {
        name: "read_github_file",
        description: "Read a specific file from the user GitHub repo. Use this when you need to see actual code to understand or fix a bug. Always use this first before searching the web.",
        parameters: {
            type: "object",
            properties: {
                filepath: {
                    type: "string",
                    description: "The file path to read e.g. src/server.js or routes/auth.js"
                }
            },
            required: ["filepath"]
        }
    }
}

export const readGithubFile = async (filepath, githubtoken, repoOwner, repoName ) => {
   
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filepath}`

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${githubtoken}`,
                Accept: "appilicaiton/vnd.github.v3.raw"
            }
        })

         if (!response.ok) {
        return `File not found: ${filepath}. Try a different path.`
    } 

    const content = await response.text()

    const lines = content.split("\n")
    if (lines.length > 200) {
        return lines.slice(0, 200).join("\n") + "\n... (truncated)"
    }

    return content


}