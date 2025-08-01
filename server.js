const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const PORT=3000;
const MONGO_URL='mongodb+srv://shubhashree:shubhashree@cluster0.mqcypxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
app.use(cors());
app.use(express.json());
const connectDb=async()=>{
try{
    await mongoose.connect(MONGO_URL);
    console.log('connected to MongoDB');
}catch(err){
    console.error('Error connecting to MongoDb',err);
}
};


const feedbackSchema = new mongoose.Schema({
  name: String,
  department: String,
  collegeName: String,
  training: String,
  rating: String,
  suggestion: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


app.post('/fb', async (req, res) => {
  try {

//  const{title,amount}=req.body;
//         const expense=new Expense({title,amount});
//         await expense.save();
    const{name,department,collegeName,training,rating,suggestion}=req.body;
        const feedback = new Feedback({name,department,collegeName,training,rating,suggestion});
     const saved=await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save feedback' });
  }
});


app.get('/fb', async (req, res) => {
  try {
    
    const fb = await Feedback.find();
    res.json(fb);
  } catch (err) {
    console.log("error fetching fb",err);
    res.status(400).json({ error: 'Failed to get feedback' });
  }
});
connectDb().then(()=>{
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});
})