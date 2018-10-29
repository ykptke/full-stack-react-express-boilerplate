import { MongoClient, ObjectID } from 'mongodb';

const _connect = (url: string) => (
  MongoClient.connect(url).then(client => client.db('rts'))
)

const connect = _connect('mongodb://localhost:27017');

export {
  connect,
  ObjectID
}
