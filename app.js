const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Connect to postgreSQL
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "server",
  password: "api123",
  post: 5432,
});

app.post("/customer", (req, res) => {
  const { id, name, age, city, address, phone, pin } = req.body;
  console.log("phone",phone);
  console.log(req.body);
  pool.query(
    "INSERT INTO customer (c_id,name,age,city,address,mobile_no,pin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [id, name, age, city, address, phone, pin],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].c_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/service", (req, res) => {
  const { id,name,desc,charge,date } = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO service (ser_id,ser_name,ser_desc,ser_charge,ser_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [id,name,desc,charge,date],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].ser_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/servicetest", (req, res) => {
  const { s_id,t_id,st_id } = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO service_test_details (service_test_id,ser_id,test_id) VALUES ($1, $2, $3) RETURNING *",
    [st_id,s_id,t_id ],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].service_test_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/testresult", (req, res) => {
  const { s_id,tr_id,instance_id } = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO test_result (test_res_id,ser_id,instance_id) VALUES ($1, $2, $3) RETURNING *",
    [tr_id,s_id,instance_id ],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].test_res_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/test", (req, res) => {
  const { id,name,dval,desc,range} = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO test_master (test_id,test_name,test_dvalue,test_desc,test_range) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [id,name,dval,desc,range],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].test_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/lab", (req, res) => {
  const { id,name,address} = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO lab (lab_id,name,address) VALUES ($1, $2, $3) RETURNING *",
    [id,name,address],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].lab_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/testschedule", (req, res) => {
  const { instance_id,lab_id,cust_id,sch_date,col_date,cust_details,status} = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO test_schedule (instance_id,lab_id,c_id,sch_datetime,collection_datetime,empl_details,status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [instance_id,lab_id,cust_id,sch_date,col_date,cust_details,status],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].instance_id}`);
    }
  );
  //   res.send("hello");
});

app.post("/trdetails", (req, res) => {
  const { sq_id,tr_id,name,dval,aval,observe} = req.body;
  console.log(req.body);
  pool.query(
    "INSERT INTO tr_details (sq_id,test_res_id,test_name,test_dval,test_aval,observation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [sq_id,tr_id,name,dval,aval,observe],
    (error, results) => {
      if (error) {
        res.send(`Unabale to insert data due to ${error}`);
      } else res.status(201).send(`User added with ID: ${results.rows[0].sq_id}`);
    }
  );
  //   res.send("hello");
});

app.get("/customers" ,(req,res)=>{
  pool.query('SELECT * FROM customer', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/services" ,(req,res)=>{
  pool.query('SELECT * FROM service', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/labs" ,(req,res)=>{
  pool.query('SELECT * FROM lab', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/serviceTests" ,(req,res)=>{
  pool.query('SELECT * FROM service_test_details', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/tests" ,(req,res)=>{
  pool.query('SELECT * FROM test_master', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/testResults" ,(req,res)=>{
  pool.query('SELECT * FROM test_result', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/testSchedules" ,(req,res)=>{
  pool.query('SELECT * FROM test_schedule', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get("/testResultDetails" ,(req,res)=>{
  pool.query('SELECT * FROM tr_details', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

//Delete queries

app.delete("/deletecustomer/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM customer WHERE c_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

app.delete("/deletelab/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM lab WHERE lab_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

app.delete("/deleteservice/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM service WHERE ser_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

app.delete("/deleteservice_test_details/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM service_test_details WHERE service_test_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})


app.delete("/deletetest_master/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM test_master WHERE test_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

app.delete("/deletetest_result/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM test_result WHERE test_res_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

app.delete("/deletetest_schedule/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM test_schedule WHERE instance_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

app.delete("/deletetr_details/:id",(req,res)=>{
  const itemId = req.params.id;
  pool.query('DELETE FROM tr_details WHERE sq_id = $1',[itemId],(error,results)=>{
    if(error){
      res.send(`Unabale to delete data due to ${error}`);
    }
    else
      res.status(201).send("Item delete successfully");
  })

})

//Update queries

app.put("/customer/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const { id,name, age, address, city, pin, phone } = req.body;

  pool.query(
    'UPDATE customer SET name = $1, age = $2, address = $3, city = $4, pin = $5, mobile_no = $6  WHERE c_id = $7',
    [name, age, address, city, pin, phone,id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}, ${results}`)
    }
  )
})

app.put("/service/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const { id,name, desc,charge,date} = req.body;

  pool.query(
    'UPDATE service SET ser_name = $1, ser_desc = $2, ser_charge = $3, ser_date = $4 WHERE ser_id = $5',
    [name, desc,charge,date,id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})

app.put("/servicetest/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const { s_id,t_id,st_id} = req.body;

  pool.query(
    'UPDATE service_test_details SET ser_id = $1, test_id = $2 WHERE service_test_id = $3',
    [s_id,t_id,st_id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})

app.put("/tests/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const { id,name,dval,desc,range} = req.body;

  pool.query(
    'UPDATE test_master SET test_name = $1, test_dvalue = $2, test_desc =$3, test_range=$4 WHERE test_id = $5',
    [name,dval,desc,range,id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})

app.put("/lab/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const {id,name,address} = req.body;

  pool.query(
    'UPDATE lab SET name = $1, address = $2 WHERE lab_id = $3',
    [name,address,id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})

app.put("/test_result/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const {s_id,tr_id,instance_id} = req.body;

  pool.query(
    'UPDATE test_result SET ser_id = $1, instance_id = $2 WHERE test_res_id = $3',
    [s_id,instance_id,tr_id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})

app.put("/testschedule/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const {instance_id,lab_id,cust_id,sch_date,col_date,cust_details,status} = req.body;

  pool.query(
    'UPDATE test_schedule SET lab_id = $1, c_id = $2,sch_datetime=$3,collection_datetime=$4,empl_details=$5,status=$6 WHERE instance_id = $7',
    [lab_id,cust_id,sch_date,col_date,cust_details,status,instance_id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})

app.put("/trdetails/:id",(req,res)=>{
  const pid = parseInt(req.params.id)
  const {sq_id,tr_id,name,dval,aval,observe} = req.body;

  pool.query(
    'UPDATE tr_details SET test_res_id = $1, test_name = $2,test_dval=$3,test_aval=$4,observation=$5 WHERE sq_id = $6',
    [tr_id,name,dval,aval,observe,sq_id],
    (error, results) => {
      if (error) {
        res.send(`Unabale to update data due to ${error}`)
      }
      else
        res.status(201).send(`User modified with ID: ${pid}`)
    }
  )
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
