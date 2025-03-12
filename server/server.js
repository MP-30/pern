require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const db = require('./db/index.js');

/*

// app.use(morgan('tiny'));
app.use(morgan('dev'));

app.use((req,res,next)=>{
    console.log("Hello from the middleware");
    next();
})

*/

/*

// this is a demo middleware
app.use((req, res, next)=> 
    res.status(404).json({
        status: "fail",
        message: "this is a middleware"
    })
    
    // {
    //  console.log("this is a middleware");
    //  next();
    // }
)
*/
// middleware for cors
app.use(cors());

// this middleware attaches the body of the request to the request object
app.use(express.json());

// this is a demo2 middleware
app.use((req, res, next)=> 
    {
    //  console.log("this is a middleware number 2");
     next();
    }
)


// get all resturants


app.get("/api/v1/restaurants", async(req, res) => {
 

    try{
        const results = await db.query('SELECT * FROM restaurants');    
        // console.log(results);
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            resturants: results.rows,
        },
    });
    }
    catch(err){
        console.log(err);
    }
    
})

//Get a resturant
app.get("/api/v1/restaurants/:id", async(req, res) => {
    console.log(req.params.id);
    try {
        // const results = db.query("SELECT * FROM restaurants WHERE id = 1", [req.params.id]);
        const results1 = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [req.params.id ]);

        // console.log(results1.rows[0]);
        res.status(200).json({
            status: "success", 
            data: {
                resturants: results1.rows[0],
            }
        }
        );
 
    } catch (error) {
        console.log(error);
    }
        
})

// create a resturants
app.post("/api/v1/restaurants", async(req, res) => {
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        // console.log(results);
        res.status(201).json({
            status: "success", 
            data: {
                resturants: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
})


// Update a resturants
app.put("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const resluts = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        // console.log(resluts);
        res.status(200).json({
            status: "success",
            data:{
                resturants: resluts.rows[0],
            }
        })
    } catch (error) {
        console.log(error);
    }
})

// Delete a resturant

app.delete("/api/v1/restaurants/:id", async(req,res)=> {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        // console.log(results);    
        res.status(204).json({
            status: "success",  
            data: null
        }
        );
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});