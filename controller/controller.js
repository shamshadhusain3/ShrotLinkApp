
const url=require("../model/schema");
const shortid=require('shortid');


// controller ,create function to controll from here

class urlrouter{

    
    static GenerateNewShortUrl=async(req,res)=>{
    // const body=req.body;
   try {
    const shortId=shortid();
    const request=req.body.url.includes('http')
    
   
     console.log('chalta hai',request)
    if (request) {
     await url.create({
         shortId:shortId,
         redirectUrl:req.body.url,
         visitedHistory:[]
 
     })
     const shortLink=`http://localhost:3000/${shortId}`
     const shortLinkH=`http://localhost:3000/analytics/${shortId}`
 
 res.render('short',{shortLink,shortLinkH,request})
    }else{
         
         // res.send({"status":"failed", "message":'Please enter a valid URL with http or https.',"url":`https://${req.body.url}`}); 
 
         const addUrl=`https://${req.body.url}`
         await url.create({
             shortId:shortId,
             redirectUrl:addUrl,
             visitedHistory:[]
     
         })
         const shortLink=`http://localhost:3000/${shortId}`
         const shortLinkH=`http://localhost:3000/analytics/${shortId}`
     
     res.render('short',{shortLink,shortLinkH,request})
 
    }
   
   } catch(error) {
    throw error
   }
   
//     res.json({"message":"url has been shortened",
// "your short id is":`http://localhost:3000/${shortId}`}) 
// const shortLink=`http://localhost:3000/url/${shortId}`
// res.render('short',{shortLink})
// console.log(shortId)
// console.log(req.body.url)
}

static redirectPage= async (req, res) => {
   try{ const shortId=req.params.shortid
    console.log(shortId)
    const entry=await url.findOneAndUpdate({shortId:shortId},{ $push:{visitedHistory:{timestamp:Date.now()}}})

       
   
    console.log(entry)
    console.log(entry.redirectUrl);
   res.redirect(entry.redirectUrl);} catch(err){
    throw err
   }
}

static handleClicks=async(req,res)=>{
   try {
    const shortId=req.params.shortid
    console.log('id',shortId)
    let result=await url.findOne({shortId})
    console.log('handle',result.shortId)
    // return res.json({
    //     totalClicks:result.visitedHistory.length,
    //     visitedHistory:result.visitedHistory
    // })

// console.log(result.visitedHistory.length)
    res.render('history',{result})
   } catch(error) {
    throw error
   }
}

static renderPage=async(req,res)=>{
    try {
        const redirectUrl=req.body.redirectUrl
    const entry=await url.findOne({redirectUrl})
    
    res.render('index')
    } catch(error) {
        throw error
    }
}

}

module.exports=urlrouter;