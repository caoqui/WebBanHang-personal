const db = require("../model/store.m");
const db3 = require("../model/user.m");

module.exports = {
 addToStore: async (req, res) => {
    var proID = req.body.proID;
    var packet = req.body.packet;
    var quantity = req.body.quantity;

    //get userid
    try {
      var userid = req.session.passport.user.userid;
      } catch (error) {
      var userid = null;
      }
    var value = {
      CusID : userid,
      ProductID : proID,
      Quantity : quantity,
    }

    var existPro = await db.checkExist(userid, proID);
    // console.log("Exit-order-product: ", existPro);

    if(!existPro[0]) {
      var proInfo = await db.insertStore(value);
      console.log("Proinfo: ", proInfo);

    } else{
      var newQuantity = parseInt(existPro[0].Quantity) + parseInt(quantity);
      // console.log("qtt: ", newQuantity);
      var proInfo = await db.updateQuantity(proID, userid, newQuantity);
      // console.log("New quantity: ", proInfo);
    }

    res.json({
      packet: parseInt(packet) + parseInt(quantity),
    })
 },

 handle: async (req, res, next) => {
    //get userid
    try {
      var userid = req.session.passport.user.userid;
      } catch (error) {
      var userid = null;
      }
    var products = await db.getProductByID(userid);
    // console.log("STORE: ", products);
    var productsDetail = [];
    for(var pro of products) {
      let one = await db.getInfoOrder(pro.ProductID, userid);
      productsDetail.push(one[0]);
      // console.log("DETAIL: ", one);

    }
    //get info of user
    var infoUser = await db3.findByID(userid);

    // console.log("STORE_DETAILs: ", productsDetail);
    
    res.render("order", {
      userID: infoUser,
      productsOrder: productsDetail
    })
 },

 delete: async (req, res, next) => {
  var proId = req.params.proId;
  //get userid
  try {
    var userid = req.session.passport.user.userid;
    } catch (error) {
    var userid = null;
    }

    var proDeleted = await db.deteleOrder(proId, userid);
    // console.log("DELETED ORDER: ", proDeleted);

    res.json({proDeleted});
  }
};
 