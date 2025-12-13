const express = require('express');
const deepseek = require('./deepseek')
const cors = require('cors')
const path = require('path')
const app = express();

app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.post('/api/deepseek', async (req, res) => {
    if (req.body.msg) {
        res.setHeader('Transfer-Encoding', 'chunked');

        const result = await deepseek(req.body.msg);
        for await (const chunk of result) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
                res.write(content);
            }
        }
        res.end()
    }
})
app.listen(9527, () => {
    console.log('9527为您服务')
})