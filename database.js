'use strict';

const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const data = require('./data');
const url = 'mongodb://localhost:27017';



MongoClient.connect(url, (err,client) => {
	assert.equal(null, err);
	console.log(`Successfully connected to ${url}`);
	const collection = client.db('todoApp').collection('todoItem');

	//inserts data into database
	//collection.insertMany(data);


//inserts stuff to array
//	step 11
	// collection.find({}).toArray((err, docs) => {
 //  			console.log(docs);
	// });


	// //step 12
	// collection.findOne(
 //  	{
 //    	title: 'Watch all animu'
 //  	},
 //  	(err, doc) => {
 //    	assert.equal(null, err);

 //   		console.log('I really need to ' + doc.title);
 //  		}
	// );

	// //step 14
	// collection.findOneAndUpdate(
	// {
	// 	_id: ObjectId(`5ab73f97f734f02d38822096`)
	// },
	// {
	// 	$set: {
	// 		title: 'Woot! Update Complete!'
	// 	}
	// },
	// {
	// 	returnNewDocument: true
	// },
	// (err, doc) => {
	// 	assert.equal(null,err);

	// 	const result = JSON.parse(JSON.stringify(doc));
	// 	console.log(
	// 		`The document: ${result.value.title} was successfully updated`
	// 		);
	// }
	// );

	//step 15
	// collection.findOneAndDelete(
	// {
	// 	_id: ObjectId(`5ab73f97f734f02d38822096`)
	// },
	// (err, doc) => {
	// 	assert.equal(null,err);

	// 	const result = JSON.parse(JSON.stringify(doc));
	// 	console.log(
	// 		`The document: ${result.value.title} was successfully deleted`
	// 		);
	// }
	// );
// //Hardcoding data, not effective, use .json instead!
// 	//inserting data into mongo db
// 	const collection1 = client.db('todoApp').collection('todoItem');
// 	collection1.insert(
//  	{
//     	title: 'finish workshop',
//     	completed: false,
//   	}
// 	);

client.close();

});

