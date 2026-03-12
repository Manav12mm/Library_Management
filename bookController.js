const Book = require("../models/Book")

exports.createBook = async(req,res)=>{
try{
const book = await Book.create(req.body)
res.status(201).json(book)
}
catch(err){
res.status(400).json(err)
}
}

exports.getBooks = async(req,res)=>{
const books = await Book.find()
res.status(200).json(books)
}

exports.getBookById = async(req,res)=>{
const book = await Book.findById(req.params.id)
res.status(200).json(book)
}

exports.updateBook = async(req,res)=>{
const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(200).json(book)
}

exports.deleteBook = async(req,res)=>{
await Book.findByIdAndDelete(req.params.id)
res.status(200).json({message:"Book deleted"})
}

exports.searchBook = async(req,res)=>{
const title = req.query.title

const books = await Book.find({
title:{$regex:title,$options:"i"}
})

res.status(200).json(books)
}