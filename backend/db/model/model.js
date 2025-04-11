// models stuff goes here, example below
import mongoose from "mongoose";
import modelSchema from "../schemas/model";

const Model = mongoose.model("model", modelSchema);

export function insertSomthing(object) {
    return Model.create(object);
}

export function findSomthing(object) {
    return Model.find(object);
}

export function getAllSomthing(object) {
    return Model.find(object);
}