const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const collection = () => getDB().collection("tasks");

const TaskModel = {
  async findAll() {
    return await collection().find().toArray();
  },
  async findById(id) {
    return await collection().findOne({ _id: new ObjectId(id) });
  },
  async findByStatus(status) {
    return await collection().find({ status }).toArray();
  },
  async create(task) {
    const result = await collection().insertOne(task);
    return { id: result.insertedId, ...task };
  },
  async updateStatus(id, status) {
    await collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    return await this.findById(id);
  },
};

module.exports = TaskModel;
