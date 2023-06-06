const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb://anishm007:${password}@ac-dttuehm-shard-00-00.hw5lsep.mongodb.net:27017,ac-dttuehm-shard-00-01.hw5lsep.mongodb.net:27017,ac-dttuehm-shard-00-02.hw5lsep.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-h1kr03-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
/*
const note = new Note({
  content: 'CSS is hard',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/


Note.find({important: true}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  
