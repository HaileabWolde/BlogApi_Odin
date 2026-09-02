const db = require("../db/tagDB")

async function fetchallTag(req, res, next){

    try{
        const alltags = await db.allTags()
        res.json({
            alltags: alltags
        })
    }
    catch(error){
        console.log("error", error)
        next(error)
    }

}
async function fetchSingleTag(req, res, next){
    const {id} = req.params
     const _id = parseInt(id)
     console.log(_id)
    try{
        const tag = await db.fetchSingleTag(_id)
        res.json({
            success: true,
            tag: tag
        }) 
    }
    catch(error){
        console.log("error", error)
        next(error)
    }
}
module.exports = {
    fetchallTag,
    fetchSingleTag
}