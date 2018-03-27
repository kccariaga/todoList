'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {
	assert.equal(null, err);
	console.log(`Successfully connected to ${url}`);
	const collection = client.db('todoApp').collection('todoItem');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

  //step 21
  app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

	app.get('/', (req, res) => {
		collection.find({}).toArray((err, docs) => {
			assert.equal(null, err);

			res.status(200).send(docs);
		});
	});

  app.post('/', (req, res) => {
    const todoItem = req.body;

    collection.insert(todoItem, (err, result) =>{
        assert.equal(null, err);

        console.log(`The todo item: ${todoItem.title} was successfully created`);

        res.status(200).send(todoItem);
    });
  });

//step 19
  app.put('/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const todoItem = req.body;
    collection.findOneAndUpdate(
    {
      _id: ObjectId(itemId)
    },
    {
      $set: {
        title: todoItem.completed
      }
    },
    {
      returnNewDocument: true
    },
    (err, doc) => {
      assert.equal(null, err);

      if(!doc.lastErrorObject.updateExisting) {
        console.log('The Todo item does not exist');
        return res.sendStatus(400);
      }

      const result = JSON.parse(JSON.stringify(doc));
      console.log(
        `The todo item ${result.value.title} was successfully updated.`
        );
        return res.sendStatus(200);
    }
    );
  });

//step 20
app.delete('/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  collection.findOneAndDelete(
    {
      _id: ObjectId(itemId)
    },
    (err, doc) => {
      assert.equal(null, err);

      const result = JSON.parse(JSON.stringify(doc));

      if (!result.value) {
        console.log('The todo item does not exist');
        return res.sendStatus(400);
      }

      console.log(
        `The todo item: ${result.value.title} was successfully deleted.`
      );

      return res.sendStatus(200);
    }
  );
});


	app.listen(3000, () => {
		console.log('the server is listening on PORT 3000');
	});
});
