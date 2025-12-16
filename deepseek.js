const { OpenAI } = require('openai')

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});
//let messages = [{role:"system",content:'现在你的名子叫蒋钊'}]
async function main(answer) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: answer }],
    model: "deepseek-chat",
    stream:true
  });
  return completion
}
module.exports=main;