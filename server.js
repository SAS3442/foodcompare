require('dotenv').config();
const express =require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')



const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://"+process.env.PROFILES_USER+":"+process.env.PROFILES_PASS+"@sas.cgtl0ii.mongodb.net/Profiles",{useNewUrlParser:true})

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const schemaitems=mongoose.Schema({
    name:String,
    picture:String,
    restraunt:String,
    rating:[],
    rating_max:Number,
    rating_max_id:Number,
    id:Number,
})

const item=mongoose.model("item",schemaitems) // foods variety schema

const schemarest=mongoose.Schema({
    name:String,
    picture:String,
    rating:[],
    rating_max:Number,
    rating_max_id:Number,
    item_id:[],
    id:Number,
})

const restro=mongoose.model("restro",schemarest) // foods variety schema

app.set('view engine','ejs')

app.get("/",(req,res)=>{
    if(req.session.isOauth){
        res.redirect("/homepage")
    }else{
    res.redirect(url) //using the auth url
}})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/homepage",isOauth,async (req,res)=>{

    // const newitem=new item({           //added a new items to the food database items collection
    //     name:"pizaa",
    //     picture:"ssssss",
    //     restraunt:"d09",
    //     rating:[4.3,3.4,4.5],
    //     rating_max:4.2,
    //     rating_max_id:1,
    //     id:1,
    // })
    // await newitem.save()
    await item.find({rating_max:{$gt:4}})
    .then((foundItems)=>{
       senditems=foundItems
    })

    // const newrestro=new restro({           //added a new items to the food database items collection
    //     name:"dominoz",
    //     picture:"ssssss",
    //     rating:[4.3,3.4,4.5],
    //     rating_max:4.5,
    //     item_id:[1],
    //     rating_max_id:1,
    //     id:1,
    // })
    // await newrestro.save()

    await restro.find({rating_max:{$gt:4}})
    .then((foundItems)=>{
       // console.log(foundItems)
       sendrestros=foundItems
    })

    res.render("home",{nexturl:"/wrongSearch",finallist:final_array,items:senditems,restros:sendrestros,username:req.session.userobject.name,picture:req.session.userobject.picture})
})

app.post("/wrongSearch",isOauth,(req,res)=>{

    searched_string=req.body.avi
    res.redirect("/appropriateSearches")

})