import express from "express"

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

const port = 3000

 app.listen(port, () => {
    console.log(`Running at port ${port}`);
    
 })