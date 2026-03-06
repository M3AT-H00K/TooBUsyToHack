var express = require('express');
var path = require('path');
var router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/user', async function (req, res) {
  const db = await connectToDB();
  try {
    const userid = parseInt(req.body.userid);

    // Insert login info into userlogs
    const newUser = {
      userid,
      password: req.body.password,
      role: "user",
      created_at: new Date(),
      modified_at: new Date()
    };
    await db.collection("userlogs").insertOne(newUser);

    // Ensure profile exists in userprofiles (no duplicates)
    await db.collection("userprofiles").updateOne(
      { id: userid }, // match by userid
      {
        $setOnInsert: {
          department: null,
          year_of_study: null,
          medals: 0
        }
      },
      { upsert: true }
    );

    // After writing to both DBs, reroute to homepage
    res.redirect(`/user/${userid}`);   // or whatever your homepage route is

  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.get('/user/:id', async (req, res) => {
  const db = await connectToDB();
  try {
    const profile = await db.collection("userprofiles").findOne({ id: parseInt(req.params.id) });

    res.render('userpage', {
      userid: profile.id,
      department: profile.department,
      year_of_study: profile.year_of_study,
      medals: profile.medals
    });
  } finally {
    await db.client.close();
  }
});

router.patch('/user/:id/settings', async (req, res) => {
  const db = await connectToDB();
  try {
    const userid = parseInt(req.params.id);
    await db.collection("userprofiles").updateOne(
      { id: userid },
      { $set: { department: req.body.department || null, year_of_study: req.body.year || null } }
    );
    res.json({ success: true });
  } finally {
    await db.client.close();
  }
});


router.get('/user', async function (req, res) {
    const db = await connectToDB();
    try {
        let results = await db.collection("userlogs").find().toArray();
        res.render('userlogs', { userlogs: results });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

module.exports = router;
