import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webbolt'
}).promise();

app.get('/tablets', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM tablets');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/tablets/:tabletid', async (req, res) => {
    try {
        let tabletid = parseInt(req.params.tabletid);
        const [rows, fields] = await db.query('SELECT id, name, os, cpu_speed, cores, display_size, resolution_x, resolution_y, ram, price FROM tablets WHERE id =?', [tabletid]);
        if (rows.length == 1){
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({error: 'There is no tablet with this id.'});
        }
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/tablets', async (req, res) => {
    try {
        let tabletData = [
            req.body.name,
            req.body.os,
            req.body.cpu_speed,
            req.body.cores,
            req.body.display_size,
            req.body.resolution_x,
            req.body.resolution_y,
            req.body.ram,
            req.body.price
        ];

        if (!tabletData[0] || tabletData[0].length < 1) {
            return res.status(400).json({ error: "Tablet name must have at least 1 character" });
        }
        if (!tabletData[1] || tabletData[1].length < 1) {
            return res.status(400).json({ error: "Operating system must have at least 1 character" });
        }
        if (isNaN(tabletData[2]) || parseFloat(tabletData[2]) <= 0) {
            return res.status(400).json({ error: "CPU speed must be a valid number greater than 0" });
        }
        if (isNaN(tabletData[3]) || parseInt(tabletData[3]) <= 0) {
            return res.status(400).json({ error: "Core count must be a valid number greater than 0" });
        }
        if (isNaN(tabletData[4]) || parseFloat(tabletData[4]) <= 0) {
            return res.status(400).json({ error: "Display size must be a valid number greater than 0" });
        }
        if (isNaN(tabletData[5]) || parseInt(tabletData[5]) <= 0) {
            return res.status(400).json({ error: "Resolution X must be a valid number greater than 0" });
        }
        if (isNaN(tabletData[6]) || parseInt(tabletData[6]) <= 0) {
            return res.status(400).json({ error: "Resolution Y must be a valid number greater than 0" });
        }
        if (isNaN(tabletData[7]) || parseInt(tabletData[7]) <= 0) {
            return res.status(400).json({ error: "RAM size must be a valid number greater than 0" });
        }
        if (isNaN(tabletData[8]) || parseInt(tabletData[8]) <= 0) {
            return res.status(400).json({ error: "Price must be a valid number greater than 0" });
        }

        const [rows, fields] = await db.query(`
            INSERT INTO tablets (name, os, cpu_speed, cores, display_size, resolution_x, resolution_y, ram, price)
            VALUES (?,?,?,?,?,?,?,?,?)`, tabletData
        );

        res.status(200).json({ message: 'Tablet successfully added!' });

    } catch (error) {
        console.error(`Error adding tablet: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete('/tablets/:tabletid', async (req, res) => {
    try {
        let tabletid = parseInt(req.params.tabletid);
        const [rows, fields] = await db.query('DELETE FROM tablets WHERE id =?', [tabletid]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Tablet not found" });
        } else {
            res.status(200).json({ message: "Tablet successfully removed" });
        }
 
    } catch (error) {
        console.error(`Error retrieving Tablet ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



app.listen(3000);
