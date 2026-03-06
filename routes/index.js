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

    // Define new user object
    const newUser = {
      userid,
      password: req.body.password,
      role: "user",
      created_at: new Date(),
      modified_at: new Date()
    };

    // ✅ Use upsert with $setOnInsert for userlogs
    await db.collection("userlogs").updateOne(
      { userid },                // match by userid
      { $setOnInsert: newUser }, // only insert if not exists
      { upsert: true }
    );

    // ✅ Ensure profile exists in userprofiles (no duplicates)
    await db.collection("userprofiles").updateOne(
      { id: userid },
      {
        $setOnInsert: {
          department: null,
          year_of_study: null,
          medals: 0,
          lastModified: new Date() // set at creation
        }
      },
      { upsert: true }
    );

    // Redirect to user homepage
    res.redirect(`/user/${userid}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.get('/user/:id', async (req, res) => {
  const db = await connectToDB();
  try {
    const userid = parseInt(req.params.id);

    // Get the current user's profile
    const profile = await db.collection("userprofiles").findOne({ id: userid });

    // Step 1: Fetch all documents without sorting
    const students = await db.collection("userprofiles").find({}).toArray();

    // Step 2: Sort in Node.js (default tie-breaking: medals only)
    const topStudents = students
      .sort((a, b) => b.medals - a.medals) // highest medals first
      .slice(0, 5);                        // keep top 5

    res.render('userpage', {
      userid: profile.id,
      department: profile.department,
      year_of_study: profile.year_of_study,
      medals: profile.medals,
      topStudents
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
