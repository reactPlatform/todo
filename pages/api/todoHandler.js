//route will be /api/todoHandler

import {MongoClient, ObjectId} from 'mongodb';

async function handler(req,res){
    const client = await MongoClient.connect('mongodb+srv://sumathi291098:nsAJXuk1WXZzpF4d@cluster0.aucbino.mongodb.net/todos?retryWrites=true&w=majority');
        const db = client.db();
        const todoCollection = db.collection('todos');
    if(req.method === 'POST'){
        const data = req.body;
        const result = await todoCollection.insertOne(data);
        res.status(201).json({message:'todo inserted'});
    }
    if(req.method === 'GET'){
        const data = await todoCollection.find({}).toArray();
        res.status(200).json({ todoList: data });
    }
    if(req.method === 'PUT'){
        const {_id,isCompleted} = req.body;
        console.log(req.body);
        await todoCollection.updateOne({_id: new ObjectId(_id)},{$set: {isCompleted}});
        res.status(200).json({ message: 'Todo updated successfully' });
    }
    client.close();
}

export default handler