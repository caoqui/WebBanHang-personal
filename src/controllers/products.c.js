const db = require("../model/products.m");
const dbStore = require("../model/store.m");

module.exports = {
  byCate: async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/user/login");
    }

    var cateId = req.params.cate || 1;
    var page = req.query.page || 1;
    var perpage = 4;

    var rs = await db.getByCate(cateId);

    proLength = rs.length;
    countpage = Math.ceil(proLength/perpage);

    try {
    //get quantity 
    var userid = req.session.passport.user.userid;
    // console.log("UserID_product: ", user);
    } catch (error) {
      userid = null;
    }

    
    var packet = await dbStore.getSumQuantity(userid);
    // console.log("number of order : ", packet);

    //create array pages
    arrPage = [];
    for (let i = 1; i <= countpage; i++) {
      arrPage.push(i);
    }

    res.render("products", {
      products: rs.slice((page - 1) * perpage, page * perpage),
      arrPage,
      packet: packet.sum
    });
  },
};
