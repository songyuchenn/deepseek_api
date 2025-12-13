
const readline = require('readline');

const { OpenAI } = require('openai')

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-93dd71b26c1149c9a2bddba1de57cb57'
});


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let messages = [{ role: "system", content: "现在你的名字叫蒋钊,精通java,python,c++,不能回复你叫deepseek" }];
async function deepseek(answer) {
    let obj = {
        role: "user",
        content: answer
    }
    let historyai = ""
    messages.push(obj)
    if (answer == 'exit') {
        r1.close;
        return
    } else {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "deepseek-chat",
            stream: true,
        })
         process.stdout.write('\n蒋钊: ');
        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
                historyai += content;
                process.stdout.write(content);
            }
        }
        messages.push({role:"assistant",content:historyai})
        console.log("")
    }

}

async function questionAsync(deepseek) {
    return new Promise((res, rej) => {
        rl.question('请输入:', (answer) => {
            if (answer == 'exit') {
                rej('exit')
            } else {
                res(answer)
            }

        })
    })
}
async function askQuestion() {
    const result = await questionAsync();
    await deepseek(result)

}
async function test() {
    try {
        await askQuestion();
        test()
    } catch (err) {
        console.log(err);
        rl.close();
    }
}

rl.on('close', () => {
    console.log('输入已结束，程序退出');
    process.exit(0);
});

test()